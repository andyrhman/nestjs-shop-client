import React from 'react';
import Layout from '@/components/Layout';
import Footer from '@/components/Footer';
import Card from '@/components/Cards/Card';
import Wrapper from '@/components/Wrapper';
import StoreHeading from '@/components/StoreHeading';
import SEO from '@/components/SEO';
import ButtonForPaginate from '@/components/Cards/ButtonForPaginate';

const HomePage = () => {
  const pageTitle = `Home | ${process.env.siteTitle}`
  return (
    <Layout>
      <SEO title={pageTitle} />
      <Wrapper>
        <StoreHeading />
        <Card />
        <ButtonForPaginate />
        <Footer />
      </Wrapper>
    </Layout>
  )
}

export default HomePage;