import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Layout from '@/components/Layout'
import Wrapper from '@/components/Wrapper'
import Footer from '@/components/Footer'
import SEO from '@/components/SEO'
import SearchProduct from '@/components/Cards/SearchProduct'
import ButtonForPaginate from '@/components/Cards/ButtonForPaginate'
import NotFound from '@/components/Cards/NotFound'
import Pagination from '@/components/PaginationForSearch'

const Search = ({ products, searchTerm }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [inputVisibleStart, setInputVisibleStart] = useState(false);
    const [inputVisibleEnd, setInputVisibleEnd] = useState(false);
    const [inputValueStart, setInputValueStart] = useState('');
    const [inputValueEnd, setInputValueEnd] = useState('');

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const pageTitle = `Search ${searchTerm} | ${process.env.siteTitle}`;
    const totalPages = Math.ceil(products.length / itemsPerPage);
    const start = Math.max(0, currentPage - 2);
    const end = Math.min(start + 5, totalPages);

    const currentItems = products.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
    return (
        <Layout>
            <SEO title={pageTitle} />
            <Wrapper>
                {currentItems.length > 0 ? (
                    <>
                        <section className="bg-white py-6 text-gray-700 sm:py-16 lg:py-20">
                            <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                                <div className="mt-10 grid grid-cols-2 gap-6 lg:mt-16 lg:grid-cols-4 lg:gap-4">
                                    <SearchProduct products={currentItems} />
                                </div>
                            </div>
                        </section>
                        <Pagination
                            itemsPerPage={itemsPerPage}
                            totalItems={products.length}
                            paginate={handlePageChange}
                            currentPage={currentPage}
                            totalPages={totalPages}
                            start={start}
                            end={end}
                            setInputVisibleStart={setInputVisibleStart}
                            setInputVisibleEnd={setInputVisibleEnd}
                            inputVisibleStart={inputVisibleStart}
                            inputVisibleEnd={inputVisibleEnd}
                            inputValueStart={inputValueStart}
                            inputValueEnd={inputValueEnd}
                            setInputValueStart={setInputValueStart}
                            setInputValueEnd={setInputValueEnd}
                        />
                    </>
                ) : (
                    <NotFound searchValue={searchTerm} />
                )}
                <Footer />
            </Wrapper>
        </Layout>
    )
}

export const getServerSideProps = async (context) => {
    const searchTerm = context.params.search;
    const { data: products } = await axios.get(`products?search=${searchTerm}`);
    return {
        props: {
            products,
            searchTerm
        }
    }
}

export default Search;