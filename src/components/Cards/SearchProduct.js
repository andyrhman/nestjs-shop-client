import React from 'react';

const SearchProduct = ({ products}) => {
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
                    <div className="py-4 flex items-start justify-between">
                        <div className="">
                            <h3 className="text-xs font-semibold sm:text-sm md:text-base">
                                <a href={`products/${p.slug}`} title="" className="cursor-pointer">
                                    {p.title}
                                    <span className="absolute" aria-hidden="true"></span>
                                </a>
                            </h3>
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


export default SearchProduct;