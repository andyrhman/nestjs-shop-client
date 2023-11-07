import React from 'react'
import axios from 'axios'
import Layout from '@/components/Layout'
import Wrapper from '@/components/Wrapper'
import Footer from '@/components/Footer'
import SEO from '@/components/SEO'

const SearchIndex = () => {
    const pageTitle = `Search Products | ${process.env.siteTitle}`
    return (
        <Layout>
            <SEO title={pageTitle} />
            <Wrapper>
                <Footer />
            </Wrapper>
        </Layout>
    )
}

export default SearchIndex