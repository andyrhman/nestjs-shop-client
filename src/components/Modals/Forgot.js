import React, { useState } from 'react'
import axios from 'axios'
import ErrorAlert from '../Alert/Error'

const Forgot = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const submitEmail = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('forgot', {
                email
            });
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
        <dialog id="forgot_password" className="modal">
            <div className="modal-box">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="text-center font-bold text-lg py-4">
                    Please insert your email, we will send you a link to change your password.
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

export default Forgot