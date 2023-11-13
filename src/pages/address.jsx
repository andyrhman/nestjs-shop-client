import React from 'react'
import Layout from '@/components/Layout'
import Wrapper from '@/components/Wrapper'
import Footer from '@/components/Footer'
import SEO from '@/components/SEO'
import AddressForm from '@/components/Forms/AddressForm'

const Address = () => {
    const pageTitle = `Address | ${process.env.siteTitle}`
    return (
        <Layout>
            <SEO title={pageTitle} />
            <Wrapper>
                <AddressForm/>
                <Footer/>
            </Wrapper>
        </Layout>
    )
}

export default Address