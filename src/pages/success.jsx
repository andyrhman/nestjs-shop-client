import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'

import Link from 'next/link'
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
    setTimeout(() => {
        router.push('/')
    }, 10000);
    return (
        <Layout>
            <SEO title={pageTitle} />
            <section className="bg-white">
                <div className="container flex items-center min-h-screen px-6 py-12 mx-auto">
                    <div className="flex flex-col items-center max-w-sm mx-auto text-center">
                        <p className="p-3 text-sm font-medium text-blue-500 rounded-full bg-blue-50">
                            <img src="/images/double-check.gif" alt="Success" className='w-32 h-32' />
                        </p>
                        <h1 className="mt-3 text-2xl font-semibold md:text-3xl">Payment Success</h1>
                        <p className="mt-4 text-gray-500">Your payment has been successfully processed!</p>
                        
                        <div className="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
                            <Link href="/" className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
                                <FontAwesomeIcon icon={faHome} className='w-4 h-4' />
                                <span> Take me home</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default Success