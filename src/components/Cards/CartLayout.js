// ? https://www.phind.com/search?cache=z1c4skx8emucp1699ul4lqsi
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import { LockClosedIcon, PlusIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import ErrorAlert from '../Alert/Error';
import Link from 'next/link';

const CartLayout = () => {
    const [userCart, setUserCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        (
            async () => {
                try {
                    const { data } = await axios.get('cart');
                    setUserCart(data);
                } catch (error) {
                    if (error.response && error.response.status === 500) {
                        console.log(error);
                    }
                    if (error.response && error.response.status === 400) {
                        console.log(error);
                    }
                }
            }
        )()
    }, []);

    useEffect(() => {
        let total = userCart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        setTotalPrice(total);
    }, [userCart]);

    const incrementQuantity = async (id) => {
        const newCart = userCart.map((item) => {
            if (item.id === id) {
                const newQuantity = item.quantity + 1;
                axios.put(`cart/${id}`, { quantity: newQuantity });
                return { ...item, quantity: newQuantity };
            }
            return item;
        });
        setUserCart(newCart);
    }

    const decrementQuantity = async (id) => {
        const newCart = userCart.map((item) => {
            if (item.id === id && item.quantity > 1) {
                const newQuantity = item.quantity - 1;
                axios.put(`cart/${id}`, { quantity: newQuantity });
                return { ...item, quantity: newQuantity };
            }
            return item;
        });
        setUserCart(newCart);
    }

    const deleteProduct = async (id) => {
        // Send a DELETE request to the server
        try {
            await axios.delete(`cart/${id}`);
            // Filter out the deleted product from the userCart array
            const newCart = userCart.filter((item) => item.id !== id);
            // Update the userCart state
            setUserCart(newCart);
        } catch (error) {
            console.log(error);
        }
    }

    // * Select Product Cart
    const [selected, setSelected] = useState([]);

    const select = (id) => {
        if (selected.some((s) => s === id)) {
            setSelected(selected.filter((s) => s !== id));
            return;
        }

        setSelected([...selected, id]);
        console.log([...selected, id])
    }

    const checkout = async () => {
        try {
            const { data } = await axios.post('checkout/orders', {
                carts: selected.map(id => ({ cart_id: id }))
            });
            router.push(`${data.url}`)
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                const errorMessage = error.response.data.message;
                setError(errorMessage);
            }
        }
    }

    // * Activate checkout button when there is cart checked
    let activateButton;

    if (selected.length > 0) { // * If selected has more than zero selected
        activateButton = (
            <button
                type="button"
                className="group inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
                onClick={checkout}
            >
                Checkout
                <svg xmlns="http://www.w3.org/2000/svg" className="group-hover:ml-8 ml-4 h-6 w-6 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
            </button>
        )
    } else {
        activateButton = (
            <button
                type="button"
                disabled
                className="btn btn-ghost btn-block"
            >
                <LockClosedIcon strokeWidth={4} className='h-6 w-6' />
            </button>
        )
    }

    return (
        <>
            <section className="h-screen bg-gray-100 py-12 sm:py-16 lg:py-20">
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-center">
                        <h1 className="text-2xl font-semibold text-gray-900">Your Cart</h1>
                    </div>

                    <div className="mx-auto mt-8 max-w-2xl md:mt-12">
                        {error
                            ?
                            <div className='flex flex-col justify-center items-center'>
                                <ErrorAlert error={error} />
                                <Link href={'/address'} className='btn btn-sm btn-info mt-4'>
                                    <PlusIcon strokeWidth={4} className='h-4 w-4' />
                                    Create Your Address
                                </Link>
                            </div>
                            : null}

                        <div className="bg-white shadow">
                            <div className="px-4 py-6 sm:px-8 sm:py-10">
                                <div className="flow-root">
                                    <ul className="-my-8">
                                        {userCart.map((c) => (
                                            <React.Fragment key={c.id}>
                                                {c.completed === false ? (
                                                    <li
                                                        className="card flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0"

                                                    >
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
                                                ) : null}
                                            </React.Fragment>
                                        ))}

                                    </ul>
                                </div>

                                <div className="mt-6 flex items-center justify-between">
                                    <p className="text-sm font-medium text-gray-900">Total</p>
                                    <p className="text-2xl font-semibold text-gray-900">
                                        <span className="text-xs font-normal text-gray-400">
                                            Rp
                                        </span>
                                        {new Intl.NumberFormat('id-ID').format(totalPrice)}</p>
                                </div>

                                <div className="mt-6 text-center">
                                    {activateButton}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default CartLayout