import React, { useState } from 'react'

const CartCompleted = ({ userCart }) => {
    const [showItems, setShowItems] = useState(2);

    const completedUserCart = userCart.filter(c => c.completed === true);

    const sortedUserCart = [...completedUserCart].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    return (
        <section className="bg-gray-100 py-4 sm:py-6 lg:py-6">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-center">
                    <h1 className="text-2xl font-semibold text-gray-900">Completed Order</h1>
                </div>

                <div className="mx-auto mt-8 max-w-2xl md:mt-12">
                    <div className="bg-white shadow">
                        <div className="px-4 py-6 sm:px-8 sm:py-10">
                            <div className="flow-root">
                                <ul className="-my-8">
                                    {/* // ? https://www.phind.com/search?cache=uodzx05j4getyqnvhbmsgjtd */}
                                    {sortedUserCart.slice(0, showItems).map((c) => (
                                        <React.Fragment key={c.id}>
                                            {c.completed === true ? (
                                                <li className="card flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0">

                                                    <div className="shrink-0">
                                                        <img
                                                            className="h-24 w-24 max-w-full rounded-lg object-cover"
                                                            src={c.product.image}
                                                        />
                                                    </div>

                                                    <div className="relative flex flex-1 flex-col justify-between">
                                                        <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                                                            <div className="pr-8 sm:pr-5">
                                                                <p className="text-base font-semibold text-gray-900">{c.product_title}</p>
                                                                <p className="mx-0 mt-1 mb-0 text-sm text-gray-400">{c.variant?.name}</p>
                                                            </div>

                                                            <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                                                                <p className="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">Rp{new Intl.NumberFormat('id-ID').format(c.price * c.quantity)}</p>

                                                                <div className="sm:order-1">
                                                                    <div className="mx-auto flex h-8 items-stretch text-gray-600">
                                                                        <div
                                                                            className="flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition"
                                                                        >
                                                                            {c.quantity}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            )
                                                : null
                                            }
                                        </React.Fragment>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="py-6 text-center">
                            {showItems < sortedUserCart.length &&
                                <button className='btn btn-sm btn-primary' onClick={() => setShowItems(showItems + 2)}>Load More</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default CartCompleted