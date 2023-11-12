import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { CheckCircleIcon } from '@heroicons/react/24/solid'

import Layout from '@/components/Layout'
import axios from 'axios'
import SEO from '@/components/SEO'

const Success = () => {
    const router = useRouter()
    const { source } = router.query;
    const pageTitle = `Payment Success | ${process.env.siteTitle}`
    useEffect(() => {
        if (source !== undefined) {
            (
                async () => {
                    await axios.post(`checkout/orders/confirm`, {
                        source
                    })
                }
            )()
        }
    }, [source])

    return (
        <Layout>
            <SEO title={pageTitle} />
            <section className="bg-white">
                <div className="container flex items-center min-h-screen px-6 py-12 mx-auto">
                    <div className="flex flex-col items-center max-w-sm mx-auto text-center">
                        <p className="p-3 text-sm font-medium text-blue-500 rounded-full bg-blue-50">
                            <CheckCircleIcon strokeWidth={4} className='h-8 w-8' />
                        </p>
                        <h1 className="mt-3 text-2xl font-semibold dark:text-white md:text-3xl">Payment Success</h1>
                        <p className="mt-4 text-gray-500">Your payment has been successfully processed!</p>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default Success