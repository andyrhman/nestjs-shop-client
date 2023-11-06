import React, { useState } from 'react'
import axios from 'axios';
import ProductCardSVG from './Cards/ProductCardSVG';
import { setProducts } from "@/redux/actions/setProductsAction";
import { connect } from "react-redux";

const Card = ({ products, lastPage, setProducts }) => {
    const [page, setPage] = useState(1);
    const perPage = 9;
    const loadMore = async () => {
        if (page < lastPage) {
            try {
                const { data: productsData } = await axios.get('products');
                const newProducts = productsData.slice(page * perPage, (page + 1) * perPage);
                setProducts([...products, ...newProducts], lastPage);
                setPage(page + 1);
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    setError('An error occured')
                }

                if (error.response && error.response.status === 403) {
                    setError('An error occured')
                }

                if (error.response && error.response.status === 404) {
                    setError('An error occured')
                }
            }
        }
    }
    return (
        <>
            {products?.map((p, index) => (
                <article className="relative" key={index + 1}>
                    <div className="aspect-square overflow-hidden">
                        <img
                            className="group-hover:scale-125 h-full w-full object-cover transition-all duration-300"
                            src={p.image}
                            alt={p.slug}
                        />
                    </div>
                    {/* Loop this */}
                    <div className="mt-4 flex items-start justify-between">
                        <div className="">
                            <h3 className="text-xs font-semibold sm:text-sm md:text-base">
                                <a href={`products/${p.slug}`} title="" className="cursor-pointer">
                                    {p.title}
                                    <span className="absolute" aria-hidden="true"></span>
                                </a>
                            </h3>
                            <div className="mt-2 flex items-center">
                                <ProductCardSVG />
                            </div>
                        </div>

                        <div className="text-right">
                            <p className="text-xs font-normal sm:text-sm md:text-base">Rp{new Intl.NumberFormat('id-ID').format(p.price)}</p>
                        </div>
                    </div>
                </article>
            ))}

        </>
    )
}

const mapStateToProps = (state) => {
    return {
        products: state.products.products,
        lastPage: state.products.lastPage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setProducts: (products, lastPage) => dispatch(setProducts(products, lastPage))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);