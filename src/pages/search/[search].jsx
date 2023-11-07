import React from 'react'
import axios from 'axios'
import Layout from '@/components/Layout'
import Wrapper from '@/components/Wrapper'
import Footer from '@/components/Footer'
import SEO from '@/components/SEO'
import SearchProduct from '@/components/Cards/SearchProduct'

const Search = ({ products }) => {
    const pageTitle = `Search Products | ${process.env.siteTitle}`
    return (
        <Layout>
            <SEO title={pageTitle} />
            <Wrapper>
                <section className="bg-white py-6 text-gray-700 sm:py-16 lg:py-20">
                    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                        <div className="mt-10 grid grid-cols-2 gap-6 lg:mt-16 lg:grid-cols-4 lg:gap-4">
                            <SearchProduct products={products} />
                        </div>
                    </div>
                </section>
                <Footer/>
            </Wrapper>
        </Layout>
    )
}

export const getServerSideProps = async (context) => {
    const searchTerm = context.params.search;
    const { data: products } = await axios.get(`products?search=${searchTerm}`);
    return {
        props: {
            products
        }
    }
}

export default Search;