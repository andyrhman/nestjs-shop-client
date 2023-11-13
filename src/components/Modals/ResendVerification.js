import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ErrorAlert from '../Alert/Error'
import 'react-toastify/dist/ReactToastify.css';
import { Slide, toast } from 'react-toastify';

const ResendVerification = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const updateSuccess = sessionStorage.getItem('updateSuccess');
        if (updateSuccess === '1') {
            // The page was just reloaded, display the toast:
            toast.success('Verification link has been sent to your email.', {
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
    const submitEmail = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('verify', {
                email
            });
            sessionStorage.setItem('updateSuccess', '1');
            window.location.reload();
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

    return (
        <dialog id="resend_verification" className="modal">
            <div className="modal-box">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="text-center font-bold text-lg py-4">
                    Please insert your email, we will send you a verification link.
                </h3>
                <div className='flex flex-col justify-center items-center py-2'>
                    <ErrorAlert error={error} />
                </div>
                <form>
                    <input
                        type="email"
                        placeholder="Your email here"
                        className="input input-bordered w-full max-w-full"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </form>

                <div className="modal-action space-x-2">
                    <button
                        onClick={submitEmail}
                        className="btn btn-info btn-block"
                        type='button'
                        disabled={loading}
                    >
                        {loading ? <span className="loading loading-bars loading-md"></span> : "Submit Email"}
                    </button>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
}

export default ResendVerification