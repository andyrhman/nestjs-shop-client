import React from 'react'
import AuthRegister from '@/components/Auth/Register'
import Navbar from '@/components/Navbar'
import Layout from '@/components/Layout'
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

const Register = () => {
  const pageTitle = `Register | ${process.env.siteTitle}`
  return (
    <Layout>
      <SEO title={pageTitle} />
      <Navbar />
      <AuthRegister />
      <Footer />
    </Layout>
  )
}

export default Register