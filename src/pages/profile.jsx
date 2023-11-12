import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout'
import Wrapper from '@/components/Wrapper'
import Footer from '@/components/Footer'
import SEO from '@/components/SEO'
import ProfileSettings from '@/components/Forms/Profile'
import UserInfo from '@/components/Cards/UserInfo'
import axios from 'axios'

import 'react-toastify/dist/ReactToastify.css';
import { Slide, toast } from 'react-toastify';
import { connect } from "react-redux";

const Profile = ({ user }) => {
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [nameError, setNameError] = useState(false)
    const [emailError, setEmailError] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [error, setError] = useState('');
    const [strength, setStrength] = useState(0);
    const router = useRouter();
    useEffect(() => {
        if (user) {
            (
                async () => {
                    try {
                        setName(user.fullName)
                        setUsername(user.username)
                        setEmail(user.email)
                    } catch (error) {
                        if (error.response && error.response.status === 401) {
                            setError('An error occurred');
                            router.push('/login');
                        }
                        if (error.response && error.response.status === 403) {
                            setError('An error occurred');
                            router.push('/login');
                        }
                    }
                }
            )()
        } else {
            router.push('/');
        }
    }, [user])

    const submitInfo = async (e) => {
        e.preventDefault()
        try {
            await axios.put('user/info', {
                fullname: name,
                username,
                email
            });
            sessionStorage.setItem('updateSuccess', '1');
            window.location.reload();
        } catch (error) {
            console.error(error.response);
            if (error.response && error.response.data && error.response.data.message) {
                const errorMessage = error.response.data.message;
                setError(errorMessage);

                // Set error flags based on the error message
                if (errorMessage.includes('Name')) {
                    setNameError(errorMessage);
                }
                if (errorMessage.includes('Email')) {
                    setEmailError(errorMessage);
                }
                if (errorMessage.includes('Username')) {
                    setUsernameError(errorMessage);
                }
            }
        }
    }
    const submitPassword = async (e) => {
        e.preventDefault()
        try {
            await axios.put('user/password', {
                password,
                confirm_password: confirmPassword
            });
            sessionStorage.setItem('updateSuccess', '1');
            window.location.reload();
        } catch (error) {
            console.error(error.response);
            if (error.response && error.response.data && error.response.data.message) {
                const errorMessage = error.response.data.message;
                setError(errorMessage);

                // Set error flags based on the error message
                if (errorMessage.includes('Password')) {
                    setPasswordError(errorMessage);
                }
            }
        }
    }

    function checkPasswordStrength(password) {
        let strength = 0;
        if (password.match(/[a-z]/)) strength++; // lower case letter
        if (password.match(/[A-Z]/)) strength++; // upper case letter
        if (password.match(/[0-9]/)) strength++; // number
        if (password.match(/[^a-zA-Z0-9]/)) strength++; // special character
        if (password.length >= 6) strength++; // length 8 or more
        return strength;
    }

    const validatePassword = (value) => {
        setPassword(value);
        setPasswordError('');
        const strength = checkPasswordStrength(value);
        setStrength(strength);

        if (!value) {
            setPasswordError('Password is required');
        } else if (value.length < 6) {
            setPasswordError('Password must be at least 6 characters long');
        }
    };
    const validateConfirmPassword = (value) => {
        setConfirmPassword(value);
        setConfirmPasswordError('');

        if (!value) {
            setConfirmPasswordError('Confirm Password is required');
        } else if (value !== password) {
            setConfirmPasswordError('Passwords do not match');
        }
    };

    const strengthBarColor = () => {
        switch (strength) {
            case 1: return 'red';
            case 2: return 'orange';
            case 3: return 'yellow';
            case 4: return 'lime';
            case 5: return 'green';
            default: return 'gray';
        }
    }

    const strengthText = () => {
        switch (strength) {
            case 1: return 'Too short';
            case 2: return 'Weak';
            case 3: return 'Okay';
            case 4: return 'Good';
            case 5: return 'Strong';
            default: return '';
        }
    }

    // * Showing the toast after deletion
    useEffect(() => {
        const updateSuccess = sessionStorage.getItem('updateSuccess');
        if (updateSuccess === '1') {
            // The page was just reloaded, display the toast:
            toast.success('Account info has been updated.', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Slide
            });

            // Clear the flag from sessionStorage so the toast isn't shown again on subsequent reloads
            sessionStorage.removeItem('updateSuccess');
        }
    }, []);
    const pageTitle = `Profile | ${process.env.siteTitle}`
    return (
        <Layout>
            <SEO title={pageTitle} />
            <Wrapper>
                <div className="flex flex-wrap">
                    {/* //* https://www.phind.com/search?cache=y2fp7qrbgub0g51l1tg04mr6 */}
                    <div className="order-2 lg:order-1 w-full lg:w-8/12 px-4">
                        <ProfileSettings
                            name={name}
                            username={username}
                            email={email}
                            setName={(e) => setName(e.target.value)}
                            setUsername={(e) => setUsername(e.target.value)}
                            setEmail={(e) => setEmail(e.target.value)}
                            setPassword={(e) => validatePassword(e.target.value)}
                            setConfirmPassword={(e) => validateConfirmPassword(e.target.value)}
                            error={error}
                            nameError={nameError}
                            usernameError={usernameError}
                            emailError={emailError}
                            passwordError={passwordError}
                            confirmPasswordError={confirmPasswordError}
                            submitInfo={submitInfo}
                            submitPassword={submitPassword}
                            strength={strength}
                            strengthText={strengthText()}
                            strengthBarColor={strengthBarColor()}
                        />
                    </div>
                    <div className="order-1 lg:order-2 w-full lg:w-4/12 px-4 lg:fixed right-0">
                        <UserInfo />
                    </div>
                </div>
                <Footer />
            </Wrapper>
        </Layout>
    )
}

export default connect(
    (state) => {
        return {
            user: state.user.user
        }
    }
)(Profile);