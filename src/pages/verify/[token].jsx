import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import Link from 'next/link'
import Layout from '@/components/Layout'
import Wrapper from '@/components/Wrapper'
import SEO from '@/components/SEO'
import Footer from '@/components/Footer'

const Verify = () => {
    const pageTitle = `Verify Account | ${process.env.siteTitle}`
    const router = useRouter();
    const { token } = router.query;
    const [error, setError] = useState('');
    useEffect(() => {
        if (token !== undefined) {
            (
                async () => {
                    try {
                        await axios.put(`verify/${token}`)
                    } catch (error) {
                        if (error.response && error.response.data && error.response.data.message) {
                            const errorMessage = error.response.data.message;
                            setError(errorMessage);
                        }
                    }

                }
            )()
        }
    }, [token])
    setTimeout(() => {
        router.push('/login')
    }, 10000);
    return (
        <Layout>
            <SEO title={pageTitle} />
            <Wrapper>
                {error ? (
                    <>
                        <section className="bg-white">
                            <div className="container flex items-center min-h-screen px-6 py-12 mx-auto">
                                <div className="flex flex-col items-center max-w-sm mx-auto text-center">
                                    <p className="p-3 text-sm font-medium text-red-500 rounded-full bg-red-50">
                                        <img src="/images/delivery.gif" alt="Success" className='w-32 h-32' />
                                    </p>
                                    <h1 className="text-2xl font-semibold md:text-3xl">Something is wrong</h1>
                                    <p className="mt-4 text-gray-500">{error}</p>

                                    <div className="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
                                        <Link href="/" className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
                                            <FontAwesomeIcon icon={faHome} className='w-4 h-4 mr-2' />
                                            <span>Take me home</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </>
                ) : (
                    <section className="bg-white">
                        <div className="container flex items-center min-h-screen px-6 py-12 mx-auto">
                            <div className="flex flex-col items-center max-w-sm mx-auto text-center">
                                <p className="p-3 text-sm font-medium text-blue-500 rounded-full bg-blue-50">
                                    <img src="/images/double-check.gif" alt="Success" className='w-32 h-32' />
                                </p>
                                <h1 className="mt-3 text-2xl font-semibold md:text-3xl">Account Verified</h1>
                                <p className="mt-4 text-gray-500">Your account has been verified successfully!</p>

                                <div className="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
                                    <Link href="/" className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
                                        <FontAwesomeIcon icon={faHome} className='w-4 h-4 mr-2' />
                                        <span>Take me home</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>
                )}
                <Footer />
            </Wrapper>
        </Layout>
    )
}

export default Verify