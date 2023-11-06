import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import Footer from '@/components/Footer';
import axios from 'axios';
import Card from '@/components/Card';
import Wrapper from '@/components/Wrapper';
import SEO from '@/components/SEO';
import StoreHeading from '@/components/StoreHeading';

const HomePage = () => {
  const pageTitle = `Home | ${process.env.siteTitle}`
  return (
    <Layout>
      <SEO title={pageTitle} />
      <Wrapper>
        <section className="bg-white py-12 text-gray-700 sm:py-16 lg:py-20">
          <StoreHeading/>
          <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
            <div className="mt-10 grid grid-cols-2 gap-6 lg:mt-16 lg:grid-cols-4 lg:gap-4">
              <Card />
            </div>
          </div>
        </section>
        <Footer />
      </Wrapper>
    </Layout>
  )
}

export default HomePage;