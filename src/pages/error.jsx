import React from 'react'
import Layout from '@/components/Layout'
import SEO from '@/components/SEO'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark, faHome } from '@fortawesome/free-solid-svg-icons'

const Error = () => {
    const pageTitle = `Invalid Payment | ${process.env.siteTitle}`
    return (
        <Layout>
            <SEO title={pageTitle} />
            <section className="bg-white">
                <div className="container flex items-center min-h-screen px-6 py-12 mx-auto">
                    <div className="flex flex-col items-center max-w-sm mx-auto text-center">
                        <p className="p-3 text-sm font-medium text-red-500 rounded-full bg-red-50">
                            <FontAwesomeIcon icon={faCircleXmark} className='w-32 h-32'/>
                        </p>
                        <h1 className="text-2xl font-semibold md:text-3xl">Invalid Payment</h1>
                        <p className="mt-4 text-gray-500">There is an error when processing the payment, please try again...</p>

                        <div className="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
                            <Link href="/" className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
                                <FontAwesomeIcon icon={faHome} className='w-4 h-4'/>
                                <span> Take me home</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default Error