import React from 'react'
import Layout from '@/components/Layout'
import Footer from '@/components/Footer'
import Wrapper from '@/components/Wrapper'
import CartLayout from '@/components/Cards/CartLayout'
import SEO from '@/components/SEO'

const Cart = () => {
    const pageTitle = `My Cart | ${process.env.siteTitle}`
  return (
    <Layout>
        <SEO title={pageTitle}/>
        <Wrapper>
            <CartLayout/>
            <Footer/>
        </Wrapper>
    </Layout>
  )
}

export default Cart