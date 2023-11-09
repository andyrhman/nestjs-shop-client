import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

import axios from 'axios';
import Wrapper from '@/components/Wrapper';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import ProductDetail from '@/components/Cards/ProductDetail';

const ProductName = () => {
    const [product, setProduct] = useState('');
    const [image, setImage] = useState('');
    const [multipleImg, setMultipleImg] = useState([]);
    const [variants, setVariants] = useState([]);

    const router = useRouter();
    const { slug } = router.query;
    const [error, setError] = useState('');

    useEffect(() => {
        if (slug) {
            (
                async () => {
                    try {
                        const { data } = await axios.get(`product/${slug}`);
                        setProduct(data);
                        setImage(data.image);
                        setMultipleImg(data.product_images);
                        setVariants(data.variant);
                    } catch (error) {
                        if (error.response && error.response.status === 401) {
                            console.log(error);
                        }
                        if (error.response && error.response.status === 403) {
                            console.log(error);
                        }
                    }
                }
            )()
        }
    }, [slug]);

    const [variantId, setVariantId] = useState('');
    const [quantity, setQuantity] = useState('');
    const submit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('cart', {
                product_title: product.title,
                quantity,
                price: product.price,
                product_id: product.id,
                variant_id: variantId
            });
            window.location.reload();
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                const errorMessage = error.response.data.message;
                setError(errorMessage);
            }
            if (error.response && error.response.status === 401) {
                setError('Please login to order the product');
                router.push('/login');
            }
        }
    }
    const pageTitle = `${slug} | ${process.env.siteTitle}`;
    return (
        <Layout>
            <SEO title={pageTitle} />
            <Wrapper>
                <ProductDetail 
                    image={image}
                    title={product.title}
                    price={product.price}
                    description={product.description}
                    multipleImg={multipleImg}
                    setImage={setImage}
                    submit={submit}
                    setQuantity={(e) => setQuantity(e.target.value)}
                    error={error}
                />
            </Wrapper>
        </Layout>
    )
}

export default ProductName