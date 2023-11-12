import React from 'react'

const AddressFrom = () => {
    return (
        <>
            <hr className="mt-6 border-b-1 border-blueGray-300" />
            {/* Address Forms */}
            <div className="rounded-t bg-white mb-0 py-6">
                <div className="text-center flex justify-between">
                    <h6 className="text-blueGray-700 text-xl font-bold">My Address</h6>
                    <button
                        className="btn btn-sm btn-info"
                        type="button"
                    >
                        <PencilSquareIcon strokeWidth={2} className="h-4 w-4" />
                        Edit
                    </button>
                </div>
            </div>
            <form>
                <div className="flex flex-wrap">
                    <div className="w-full lg:w-12/12 px-4">
                        <div className="relative w-full mb-3">
                            <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            >
                                Address
                            </label>
                            <input
                                type="text"
                                className="input input-bordered px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
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
                                type="email"
                                className="input input-bordered px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                defaultValue="New York"
                            />
                        </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4">
                        <div className="relative w-full mb-3">
                            <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            >
                                Country
                            </label>
                            <input
                                type="text"
                                className="input input-bordered px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                defaultValue="United States"
                            />
                        </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4">
                        <div className="relative w-full mb-3">
                            <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            >
                                Postal Code
                            </label>
                            <input
                                type="text"
                                className="input input-bordered px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                defaultValue="Postal Code"
                            />
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default AddressFrom