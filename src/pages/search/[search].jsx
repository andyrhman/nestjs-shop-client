import React from 'react'
import axios from 'axios'
import Layout from '@/components/Layout'
import Wrapper from '@/components/Wrapper'
import Footer from '@/components/Footer'
import SEO from '@/components/SEO'
import SearchProduct from '@/components/Cards/SearchProduct'
import ButtonForPaginate from '@/components/Cards/ButtonForPaginate'
import NotFound from '@/components/Cards/NotFound'

const Search = ({ products, searchTerm }) => {
    const pageTitle = `Search ${searchTerm} | ${process.env.siteTitle}`
    return (
        <Layout>
            <SEO title={pageTitle} />
            <Wrapper>
                {products.length > 0 ? (
                    <>
                        <section className="bg-white py-6 text-gray-700 sm:py-16 lg:py-20">
                            <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                                <div className="mt-10 grid grid-cols-2 gap-6 lg:mt-16 lg:grid-cols-4 lg:gap-4">
                                    <SearchProduct products={products} />
                                </div>
                            </div>
                        </section>
                        <ButtonForPaginate/>
                    </>
                ) : (
                    <NotFound searchValue={searchTerm}/>
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