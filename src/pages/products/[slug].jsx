import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import { Slide, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';
import Wrapper from '@/components/Wrapper';
import Footer from '@/components/Footer';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import ProductDetail from '@/components/Cards/ProductDetail';
import Breadcrumbs from '@/components/Breadcrumb';

const ProductName = () => {
    const [product, setProduct] = useState('');
    const [image, setImage] = useState('');
    const [multipleImg, setMultipleImg] = useState([]);
    const [variants, setVariants] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

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
                        setReviews(data.review);

                        setLoading(false);
                    } catch (error) {
                        if (error.response && error.response.status === 401) {
                            console.log(error);
                        }
                        if (error.response && error.response.status === 403) {
                            console.log(error);
                        }
                        setLoading(false);
                    }
                }
            )()
        }
    }, [slug]);

    // * Showing the toast after deletion
    useEffect(() => {
        const addedToCart = sessionStorage.getItem('addedToCart');
        if (addedToCart === '1') {
            // The page was just reloaded, display the toast:
            toast.success('Product Added To Cart', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Slide
            });
            // Clear the flag from sessionStorage so the toast isn't shown again on subsequent reloads
            sessionStorage.removeItem('addedToCart');
        }
    }, []);

    const [variantId, setVariantId] = useState('');
    const [quantity, setQuantity] = useState('');
    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('cart', {
                product_title: product.title,
                quantity: parseInt(quantity),
                price: product.price,
                product_id: product.id,
                variant_id: variantId
            });
            window.location.reload();
            sessionStorage.setItem('addedToCart', '1');
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                const errorMessage = error.response.data.message;
                setError(errorMessage);
            }
            if (error.response && error.response.status === 401) {
                setError('Please login to order the product');
                router.push('/login');
            }
        } finally {
            setLoading(false);
        }
    }
    const pageTitle = loading
        ? `Loading... | ${process.env.siteTitle}`
        : `${product.title} | ${process.env.siteTitle}`;

    return (
        <Layout>
            <SEO title={pageTitle} />
            <Wrapper>
                <section className="py-12 sm:py-16">
                    <div className="container mx-auto px-4">
                        <Breadcrumbs title={loading ? 'Loading...' : product.title} />
                        <ProductDetail
                            image={image}
                            title={product.title}
                            price={product.price}
                            description={product.description}
                            variants={variants}
                            multipleImg={multipleImg}
                            reviews={reviews}
                            productId={product.id}
                            setImage={setImage}
                            setVariantId={(e) => setVariantId(e.target.value)}
                            submit={submit}
                            setQuantity={(e) => setQuantity(e.target.value)}
                            loading={loading}
                            error={error}
                        />
                    </div>
                </section>
                <Footer/>
            </Wrapper>
        </Layout>
    )
}

export default ProductName