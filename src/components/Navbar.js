import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ArrowLeftOnRectangleIcon, UserPlusIcon } from '@heroicons/react/24/solid';
import { connect } from "react-redux";
import Link from 'next/link';
import UserDropdown from './UserDropdown';
import axios from 'axios';

const Navbar = ({ user }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState([]);
    const router = useRouter();

    useEffect(() => {
        if (searchTerm) {
            axios.get(`products?search=${searchTerm}`)
                .then(res => {
                    setProducts(res.data);
                })
                .catch(err => {
                    console.error(err);
                });
        } else {
            setProducts([]);
        }
    }, [searchTerm]);

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            router.push(`/search/${searchTerm}`);
        }
    }
    return (
        <>
            <div className="navbar bg-base-100">
                <div className='navbar-start'>
                    <Link href={"/"} className="btn btn-ghost normal-case text-xl">Shopyfy</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <div className="relative mx-auto text-gray-600 w-full max-w-full">
                        <div className="relative text-gray-600 focus-within:text-gray-400">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                <button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                </button>
                            </span>
                            <input
                                type="search"
                                name="search"
                                className="py-2 text-sm text-white rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900"
                                autoComplete="off"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                onKeyUp={handleSearch}
                            />
                        </div>
                        {products.length > 0 && (
                            <div className="absolute w-full left-0 mt-2">
                                <ul className="bg-white border rounded-lg overflow-hidden">
                                    {products.map((product) => (
                                        <li key={product.id} className="p-2 hover:bg-gray-100">
                                            <Link href={`/products/${product.slug}`}>
                                                {product.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
                <div className='navbar-end'>
                    {user ? (
                        <>
                            <UserDropdown info={user?.fullName} />
                        </>
                    ) : (
                        <>
                            <div className="dropdown dropdown-end lg:flex mr-4">
                                <Link href={'/login'} className="btn btn-sm btn-success">
                                    <ArrowLeftOnRectangleIcon strokeWidth={2} className="h-6 w-6" />
                                    Login
                                </Link>
                            </div>
                            <div className="dropdown dropdown-end lg:flex">
                                <Link href={'/register'} className="btn btn-sm btn-neutral">
                                    <UserPlusIcon strokeWidth={2} className="h-6 w-6" />
                                    Register
                                </Link>
                            </div>
                        </>
                    )}

                </div>

            </div>
        </>
    )
}

export default connect(
    (state) => {
        return {
            user: state.user.user
        }
    }
)(Navbar);