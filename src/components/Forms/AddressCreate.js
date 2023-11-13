import React from 'react'
import { PencilSquareIcon } from '@heroicons/react/24/solid'

const AddressCreate = ({
    setPhone,
    setStreet,
    setCountry,
    setProvince,
    setCity,
    setZip,
    submitCreate
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
                    onClick={submitCreate}
                >
                    <PencilSquareIcon strokeWidth={2} className="h-4 w-4" />
                    Submit
                </button>
            </div>
    </>
  )
}

export default AddressCreate