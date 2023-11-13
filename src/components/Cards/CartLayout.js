// ? https://www.phind.com/search?cache=z1c4skx8emucp1699ul4lqsi
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import { LockClosedIcon, PlusIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import ErrorAlert from '../Alert/Error';
import Link from 'next/link';
import CartLoop from './CartLoop';
import CartCompleted from './CartCompleted';

const CartLayout = () => {
    const [userCart, setUserCart] = useState([]);
    const [selected, setSelected] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
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
                    if (error.response && error.response.status === 401) {
                        router.push('/');
                    }
                }
            }
        )()
    }, []);

    useEffect(() => {
        let total = userCart
            .filter(item => item.completed === false && selected.includes(item.id))
            .reduce((acc, item) => acc + (item.price * item.quantity), 0);
        setTotalPrice(total);
    }, [userCart, selected]);

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

    const select = (id) => {
        setSelected(prevSelected => {
            if (prevSelected.includes(id)) {
                // If the id is already selected, remove it from the array
                return prevSelected.filter(itemId => itemId !== id);
            } else {
                // If the id is not selected, add it to the array
                return [...prevSelected, id];
            }
        });
        console.log([...selected, id])
    }

    const checkout = async () => {
        setLoading(true);
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
        } finally {
            setLoading(false);
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
                {loading
                    ? (
                        <span className="loading loading-bars loading-md"></span>
                    ) : (
                        <>
                            Checkout
                            <svg xmlns="http://www.w3.org/2000/svg" className="group-hover:ml-8 ml-4 h-6 w-6 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </>
                    )
                }

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
            <section className=" bg-gray-100 py-4 sm:py-8 lg:py-8">
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-center">
                        <h1 className="text-2xl font-semibold text-gray-900">Your Cart</h1>
                    </div>

                    <div className="mx-auto mt-8 max-w-2xl md:mt-12">
                        {error
                            ?
                            <div className='flex flex-col justify-center items-center'>
                                <ErrorAlert error={error} />
                                <Link href={'/address'} target='_blank' className='btn btn-sm btn-info mt-4'>
                                    <PlusIcon strokeWidth={4} className='h-4 w-4' />
                                    Create Your Address
                                </Link>
                            </div>
                            : null}

                        <div className="bg-white shadow">
                            <div className="px-4 py-6 sm:px-8 sm:py-10">
                                <div className="flow-root">
                                    <ul className="-my-8">
                                        <CartLoop
                                            userCart={userCart}
                                            select={select}
                                            selected={selected}
                                            decrementQuantity={decrementQuantity}
                                            incrementQuantity={incrementQuantity}
                                            deleteProduct={deleteProduct}
                                        />
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
            <CartCompleted userCart={userCart} />
        </>
    )
}

export default CartLayout