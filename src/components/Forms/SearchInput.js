import React from 'react'
import Link from 'next/link';

const SearchInput = ({searchTerm, handleSearch, onChangeSearch, products}) => {
    return (
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
                    className="py-2 text-sm text-white rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900 w-full"
                    autoComplete="off"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={onChangeSearch}
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
    )
}

export default SearchInput