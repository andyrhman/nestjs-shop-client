import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import Footer from '@/components/Footer';
import axios from 'axios';
import { Card, products } from '@/components/Card';
import Wrapper from '@/components/Wrapper';
import SEO from '@/components/SEO';

const HomePage = () => {
  const pageTitle = `Home | ${process.env.siteTitle}`
  return (
    <Layout>
      <SEO title={pageTitle} />
      <Wrapper>
        <div className="flex flex-col justify-between min-h-screen">
          <div className='mx-auto max-w-6xl'>
            <div className="py-12 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-8">
              {products.map((post) => (
                <Card
                  key={post.id}
                  title={post.title}
                  description={post.description}
                  image={post.image}
                  categories={post.categories}
                  uploader={post.uploader}
                />
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </Wrapper>
    </Layout>
  )
}

export default HomePage;