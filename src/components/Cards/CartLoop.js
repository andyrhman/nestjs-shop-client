import React from 'react'

const CartLoop = ({
    userCart,
    select,
    selected,
    decrementQuantity,
    incrementQuantity,
    deleteProduct
}) => {
    return (
        <>
            {userCart.map((c) => (
                <React.Fragment key={c.id}>
                    {c.completed === false ? (
                        <li className="card flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
                            <div className='mt-6'>
                                <input
                                    type="checkbox"
                                    onClick={() => select(c.id)}
                                    defaultChecked={selected.some((s) => s === c.id)}
                                    className="checkbox"
                                />
                            </div>

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
                                                <button
                                                    onClick={() => decrementQuantity(c.id)}
                                                    className="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                                                >
                                                    -
                                                </button>
                                                <div
                                                    className="flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition"
                                                >
                                                    {c.quantity}
                                                </div>
                                                <button
                                                    onClick={() => incrementQuantity(c.id)}
                                                    className="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
                                    <button type="button" onClick={() => deleteProduct(c.id)} className="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900">
                                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" className=""></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </li>
                    )
                        : null
                    }
                </React.Fragment>
            ))}
        </>
    )
}

export default CartLoop