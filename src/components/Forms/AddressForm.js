import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import axios from 'axios'
import ErrorAlert from '../Alert/Error';

import 'react-toastify/dist/ReactToastify.css';
import { Slide, toast } from 'react-toastify';
import AddressUpdate from './AddressUpdate';
import AddressCreate from './AddressCreate';

const AddressForm = ({ user }) => {
    const [address, setAddress] = useState('');
    const [street, setStreet] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [zip, setZip] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    useEffect(() => {
        (
            async () => {
                try {
                    const { data } = await axios.get('address');
                    setAddress(data);
                    setStreet(data.street);
                    setCountry(data.country);
                    setCity(data.city);
                    setProvince(data.province);
                    setZip(data.zip);
                    setPhone(data.phone);
                } catch (error) {
                    if (error.response && error.response.status === 401) {
                        router.push('/login');
                    }
                    if (error.response && error.response.status === 403) {
                        router.push('/login');
                    }
                }
            }
        )()
    }, []);
    useEffect(() => {
        const updateSuccess = sessionStorage.getItem('updateSuccess');
        if (updateSuccess === '1') {
            // The page was just reloaded, display the toast:
            toast.success('Address has been updated.', {
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
    const submitUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put('address', {
                street,
                city,
                province,
                zip,
                country,
                phone,
            });
            sessionStorage.setItem('updateSuccess', '1');
            window.location.reload();
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                const errorMessage = error.response.data.message;
                setError(errorMessage);
            }
            if (error.response && error.response.status === 401) {
                router.push('/login');
            }
        }
    };
    const submitCreate = async (e) => {
        e.preventDefault();
        try {
            await axios.post('address', {
                street,
                city,
                province,
                zip,
                country,
                phone,
            });
            sessionStorage.setItem('updateSuccess', '1');
            window.location.reload();
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                const errorMessage = error.response.data.message;
                setError(errorMessage);
            }
            if (error.response && error.response.status === 401) {
                router.push('/login');
            }
        }
    };
    return (
        <div className='container mx-auto px-4 py-8 max-w-xl'>
            <hr className="mt-6 border-b-1 border-blueGray-300" />
            {/* Address Forms */}
            <div className="rounded-t bg-white mb-0 py-6">
                <div className="text-center flex justify-between">
                    <h6 className="text-blueGray-700 text-xl font-bold">My Address</h6>
                </div>
            </div>
            <div className='flex justify-center items-center'>
                <ErrorAlert error={error} />
            </div>
            {address ? (
                <>
                    <AddressUpdate
                        phone={phone}
                        setPhone={setPhone}
                        street={street}
                        setStreet={setStreet}
                        country={country}
                        setCountry={setCountry}
                        province={province}
                        setProvince={setProvince}
                        city={city}
                        setCity={setCity}
                        zip={zip}
                        setZip={setZip}
                        submitUpdate={submitUpdate}
                    />
                </>
            ) : user ? (
                <AddressCreate
                    setPhone={setPhone}
                    setStreet={setStreet}
                    setCountry={setCountry}
                    setProvince={setProvince}
                    setCity={setCity}
                    setZip={setZip}
                    submitCreate={submitCreate}
                />
            ) : (
                null
            )}

        </div>
    )
}

export default connect(
    (state) => {
        return {
            user: state.user.user
        }
    }
)(AddressForm);