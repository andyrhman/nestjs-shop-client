import React, { useState } from 'react';
import axios from 'axios';
import Forgot from '../Modals/Forgot';
import { useRouter } from 'next/router';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import FacebookLogin from '@greatsumini/react-facebook-login';
import ResendVerification from '../Modals/ResendVerification';

const AuthLogin = () => {
    // * Standard Login
    const [password, setPassword] = useState('');
    const [usernameOrEmail, setUsernameOrEmail] = useState(''); // Change this line
    const [passwordError, setPasswordError] = useState('');
    const [usernameOrEmailError, setUsernameOrEmailError] = useState(false); // Change this line
    const [error, setError] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const router = useRouter(); // Initialize the router instance
    const [loading, setLoading] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        setUsernameOrEmailError(false); // Change this line
        setLoading(true);
        setPasswordError('');
        setError('');

        const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

        const isEmail = emailRegex.test(usernameOrEmail);

        try {
            const { data } = await axios.post('user/login', {
                email: isEmail ? usernameOrEmail : undefined,
                username: isEmail ? undefined : usernameOrEmail,
                password,
                rememberMe
            });
            if (data) {
                router.push('/');
            } else {
                // Sign-in failed, display an error message
                setError('An error occurred during sign-in');
            }


        } catch (error) {
            console.error(error.response);
            if (error.response && error.response.data && error.response.data.message) {
                const errorMessage = error.response.data.message;
                setError(errorMessage);

                // Set error flags based on the error message
                if (errorMessage.includes('Username or Email')) {
                    setUsernameOrEmailError(errorMessage);
                }
                if (errorMessage.includes('Password')) {
                    setPasswordError(errorMessage);
                }
            }
        } finally {
            setLoading(false);
        }
    };

    const validatePassword = (value) => {
        setPassword(value);
        setPasswordError('');

        if (!value) {
            setPasswordError('Password is required');
        }
    };

    // * Google Login
    const onSuccess = async (googleUser) => {
        const { data } = await axios.post('user/google-auth', {
            token: googleUser.credential,
            rememberMe
        })

        if (data) {
            router.push('/')
        } else {
            setError('An error occurred during sign-in');
        }
    }

    const onError = (e) => {
        console.log(e);
    }

    // * Facebook Login
    const onFacebookSuccess = async (facebookUser) => {
        const { data } = await axios.post('user/facebook-auth', {
            token: facebookUser.accessToken,
            rememberMe
        })
        if (data) {
            router.push('/')
        } else {
            setError('An error occurred during sign-in');
        }
    }
    const onFacebookError = (e) => {
        console.log(e);
    }

    const forgotPassword = (e) => {
        e.preventDefault();
        document.getElementById('forgot_password').showModal();
    }
    const resendVerifcation = (e) => {
        e.preventDefault();
        document.getElementById('resend_verification').showModal();
    }
    return (
        <>
            <Forgot />
            <ResendVerification/>
            <div className="flex flex-col justify-center items-center h-screen">
                <article className='prose'>
                    <h1>Sign In</h1>
                    <div className="mt-1 font-normal">
                        Enter your details to sign-in.

                    </div>
                </article>
                {error && (
                    <>
                        <div className="alert alert-error w-96">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                className="stroke-current shrink-0 h-6 w-6"
                                fill="none" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <span>{error}</span>
                        </div>
                        <button type='button' className="text-blue-500 text-xs mt-1" onClick={(e) => resendVerifcation(e)}>
                            Resend Email Verification
                        </button>
                    </>
                )}

                <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                    <div className="mb-4 flex flex-col">
                        <div className='mb-5'>
                            <input
                                type="text"
                                placeholder="Email or Username"
                                className={
                                    usernameOrEmailError
                                        ? ("input input-bordered input-error w-full max-w-full")
                                        : ("input input-bordered input-md w-full max-w-full")
                                }
                                onChange={(e) => setUsernameOrEmail(e.target.value)}
                            />

                            {usernameOrEmailError && <div className="text-red-500 text-xs mt-1">{usernameOrEmailError}</div>}
                        </div>
                        <div className='mb-2'>
                            <input
                                type="password"
                                placeholder="Password"
                                className={
                                    passwordError
                                        ? ("input input-bordered input-error w-full max-w-full")
                                        : ("input input-bordered w-full max-w-full")
                                }
                                onChange={(e) => validatePassword(e.target.value)}
                            />

                            {passwordError && <div className="text-red-500 text-xs mt-1">{passwordError}</div>}
                        </div>
                    </div>
                    <div className="form-control flex flex-row justify-between">
                        <label className="label cursor-pointer gap-4">
                            <input
                                type="checkbox"
                                className="checkbox"
                                onChange={(e) => setRememberMe(e.target.checked)} // Add this line to capture the checkbox state

                            />
                            <span className="label-text">Remember me</span>
                        </label>
                        <button className='text-blue-500 hover:text-blue-800' onClick={(e) => forgotPassword(e)}>Forgot Password?</button>
                    </div>
                    <button className="btn btn-block btn-primary mt-4" onClick={submit}>
                        {loading ? <span className="loading loading-bars loading-md"></span> : "Login"}
                    </button>

                    <article className='prose text-center mt-4'>
                        <h4>OR SIGN IN WITH</h4>
                    </article>
                    <div className='mt-8'>
                        <GoogleOAuthProvider clientId="170095590590-i2p45vs96q11admvl2b6pbgbsc298dmd.apps.googleusercontent.com">
                            <GoogleLogin
                                onSuccess={onSuccess}
                                onError={onError}
                                type='standard'
                                logo_alignment='center'
                                size='large'
                                width="385"
                            />
                        </GoogleOAuthProvider>
                    </div>
                    <div className='mt-4'>
                        <FacebookLogin
                            appId="2659171481015709"
                            onSuccess={onFacebookSuccess}
                            onFail={onFacebookError}
                            className='btn btn-block'
                            style={{
                                backgroundColor: '#4267b2',
                                color: '#fff',
                                fontSize: '16px',
                                padding: '12px 24px',
                                border: 'none',
                                borderRadius: '4px',
                            }}
                        >
                            Login With Facebook
                            <i className="fa-brands fa-facebook" />
                        </FacebookLogin>
                    </div>
                </form>

            </div>

        </>
    )
}

export default AuthLogin