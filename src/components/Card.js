import React from 'react'
import ProductCardSVG from './Cards/ProductCardSVG';
import { connect } from "react-redux";

const Card = ({ products }) => {
    return (
        <>
            {products?.map((p) => (
                <article className="relative" key={p.id}>
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

export default connect(
    (state) => {
        return {
            products: state.products.products
        }
    }
)(Card);