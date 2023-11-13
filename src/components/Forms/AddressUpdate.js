import React from 'react'
import { PencilSquareIcon } from '@heroicons/react/24/solid'

const AddressUpdate = ({
    phone,
    setPhone,
    street,
    setStreet,
    country,
    setCountry,
    province,
    setProvince,
    city,
    setCity,
    zip,
    setZip,
    submitUpdate
}) => {
    return (
        <>
            <form>
                <div className="flex flex-wrap">
                    <div className="w-full lg:w-12/12 px-4">
                        <div className="relative w-full mb-3">
                            <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            >
                                Phone Number
                            </label>
                            <input
                                type="number"
                                className="input input-bordered px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                placeholder="Insert your phone number"
                                defaultValue={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="w-full lg:w-12/12 px-4">
                        <div className="relative w-full mb-3">
                            <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            >
                                Street
                            </label>
                            <input
                                type="text"
                                className="input input-bordered px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                placeholder="Insert your street address"
                                defaultValue={street}
                                onChange={(e) => setStreet(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="w-full lg:w-12/12 px-4">
                        <div className="relative w-full mb-3">
                            <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            >
                                Country
                            </label>
                            <input
                                type="text"
                                className="input input-bordered px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                placeholder="Insert your Country"
                                defaultValue={country}
                                onChange={(e) => setCountry(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4">
                        <div className="relative w-full mb-3">
                            <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            >
                                City
                            </label>
                            <input
                                type="text"
                                className="input input-bordered px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                placeholder="Insert your city"
                                defaultValue={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4">
                        <div className="relative w-full mb-3">
                            <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            >
                                Province
                            </label>
                            <input
                                type="text"
                                className="input input-bordered px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                placeholder="Insert your province"
                                defaultValue={province}
                                onChange={(e) => setProvince(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4">
                        <div className="relative w-full mb-3">
                            <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            >
                                Zip Code
                            </label>
                            <input
                                type="text"
                                className="input input-bordered px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                placeholder="Insert your zip code"
                                defaultValue={zip}
                                onChange={(e) => setZip(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </form>
            <div className='py-4'>
                <button
                    className="btn btn-sm btn-info btn-block"
                    type="button"
                    onClick={submitUpdate}
                >
                    <PencilSquareIcon strokeWidth={2} className="h-4 w-4" />
                    Submit
                </button>
            </div>
        </>
    )
}

export default AddressUpdate