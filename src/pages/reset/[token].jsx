import React from 'react'
import Layout from '@/components/Layout'
import Wrapper from '@/components/Wrapper'
import SEO from '@/components/SEO'
import ChangePassword from '@/components/Forms/ChangePassword'
import Footer from '@/components/Footer'

const ResetPassword = () => {
    const pageTitle = `Forgot Password | ${process.env.siteTitle}`
    return (
        <Layout>
            <SEO title={pageTitle} />
            <Wrapper>
                <ChangePassword/>
                <Footer/>
            </Wrapper>
        </Layout>
    )
}

export default ResetPassword