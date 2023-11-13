import React from 'react';

import SmallError from '../Alert/SmallError';
import ProductReviewStar from './ProductReviewStar';
import BackToProductButton from '../Buttons/BackToProductButton';
import Review from './Review';
import ReviewForm from '../Forms/ReviewForm';

const ProductDetail = ({
    product,
    image,
    title,
    price,
    description,
    setImage,
    multipleImg,
    variants,
    reviews,
    productId,
    setVariantId,
    submit,
    setQuantity,
    loading,
    error
}) => {
    return (
        <>
            <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
                <div className="lg:col-span-3 lg:row-end-1">
                    <div className="lg:flex lg:items-start">
                        <div className="lg:order-2 lg:ml-5">
                            <div className="max-w-xl overflow-hidden rounded-lg">
                                <img
                                    className="h-full w-full max-w-full object-cover"
                                    src={image}
                                    alt={title}
                                />
                            </div>
                        </div>

                        <div className="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
                            <div className="flex flex-row items-start lg:flex-col">

                                {multipleImg.map((i) => (
                                    <button
                                        key={i.id}
                                        type="button"
                                        className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-gray-900 text-center"
                                        onClick={() => setImage(i.image)}
                                    >
                                        <img className="h-full w-full object-cover" src={i.image} alt="" />
                                    </button>
                                ))}

                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
                    <BackToProductButton />
                    <h1 className="sm: text-2xl font-bold text-gray-900 sm:text-3xl">{title}</h1>
                    <ProductReviewStar averageRating={product}/>
                    <form>
                        <h2 className="mt-8 text-base text-gray-900">Choose Variant</h2>
                        <div className="mt-3 flex select-none flex-wrap items-center gap-1">
                            {variants.map((v) => (
                                <label className="" key={v.id}>
                                    <input
                                        type="radio"
                                        name="type"
                                        value={v.id}
                                        onChange={setVariantId}
                                        className="peer sr-only" />
                                    <p className="peer-checked:bg-black peer-checked:text-white rounded-lg border border-black px-6 py-2 font-bold">
                                        {v.name}
                                    </p>
                                </label>
                            ))}
                        </div>

                        <h2 className="mt-8 text-base text-gray-900">Choose Quantity</h2>
                        <input
                            type="number"
                            name="quantity"
                            min="1"
                            max="10"
                            onChange={setQuantity}
                            className="w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                            placeholder='Insert your product quantity'
                        />
                        <SmallError error={error} />
                    </form>

                    <div className="mt-4 flex flex-col space-y-4 border-t border-b py-4 sm:flex-col sm:space-y-0">
                        <div className="flex mb-4">
                            <h1 className="text-3xl font-bold">Rp{new Intl.NumberFormat('id-ID').format(price)}</h1>
                        </div>
                        <button
                            type="button"
                            className="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-gray-900 bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
                            onClick={submit}
                        >
                            {loading ? (
                                <span className="loading loading-bars loading-md"></span>
                            ) : (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                    Add to cart
                                </>
                            )}
                        </button>
                    </div>

                    <ul className="mt-8 space-y-2">
                        <li className="flex items-center text-left text-sm font-medium text-gray-600">
                            <svg className="mr-2 block h-5 w-5 align-middle text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" className=""></path>
                            </svg>
                            Free shipping worldwide
                        </li>

                        <li className="flex items-center text-left text-sm font-medium text-gray-600">
                            <svg className="mr-2 block h-5 w-5 align-middle text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" className=""></path>
                            </svg>
                            Cancel Anytime
                        </li>
                    </ul>
                </div>

                <div className="lg:col-span-3">
                    <div className="mt-8 flow-root sm:mt-12">
                        <h1 className="text-3xl font-bold">Delivered To Your Door</h1>
                        <p className="mt-4">{description}</p>
                    </div>
                    <div className="mt-8 flow-root sm:mt-12">
                        <ReviewForm productId={productId} />
                        <Review
                            reviews={reviews}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductDetail