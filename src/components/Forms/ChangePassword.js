import React, { useState } from 'react'
import { useRouter } from 'next/router';
import axios from 'axios';
import ErrorAlert from '../Alert/Error';

const ChangePassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const [error, setError] = useState('');
    const [strength, setStrength] = useState(0);
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { token } = router.query;

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('reset', {
                token,
                password,
                confirm_password: confirmPassword
            })
            router.push('/login')
        } catch (error) {
            console.error(error.response);
            if (error.response && error.response.data && error.response.data.message) {
                window.scrollTo(0, 0);
                const errorMessage = error.response.data.message;
                setError(errorMessage);
            }
        } finally {
            setLoading(false);
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

    const validateConfirmPassword = (value) => {
        setConfirmPassword(value);
        setConfirmPasswordError('');

        if (!value) {
            setConfirmPasswordError('Confirm Password is required');
        } else if (value !== password) {
            setConfirmPasswordError('Passwords do not match');
        }
    };
    return (
        <div className="flex flex-col justify-center items-center py-12">
            <article className='prose'>
                <h1>Change Password</h1>
                <div className="mt-1 font-normal">
                    Enter your new password.
                </div>
            </article>
            <ErrorAlert error={error} />
            <form className="py-2 w-80 max-w-screen-lg sm:w-96">
                <div className="mb-4 flex flex-col">
                    <div className='mb-2'>
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
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
                        <div style={{
                            fontSize: '12px',
                            textAlign: 'right',
                            color: strengthBarColor(),
                        }}>
                            {strengthText()}
                        </div>
                        <div style={{
                            height: '10px',
                            width: `${strength * 20}%`,
                            backgroundColor: strengthBarColor(),
                            transition: 'width 0.3s ease-in-out',
                        }} />
                        {passwordError && <div className="text-red-500 text-xs mt-1">{passwordError}</div>}
                    </div>
                    <div className='mb-2'>
                        <label className="label">
                            <span className="label-text">Confirm Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className={
                                confirmPasswordError
                                    ? ("input input-bordered input-error w-full max-w-full")
                                    : ("input input-bordered w-full max-w-full")
                            }
                            onChange={(e) => validateConfirmPassword(e.target.value)}
                        />

                        {confirmPasswordError && <div className="text-red-500 text-xs mt-1">{confirmPasswordError}</div>}
                    </div>
                </div>
                <button className='btn btn-block btn-neutral' onClick={submit}>
                    {loading ? <span className="loading loading-bars loading-md"></span> : "Submit Password"}
                </button>
            </form>

        </div>
    )
}

export default ChangePassword