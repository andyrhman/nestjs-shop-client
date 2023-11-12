import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";

const UserInfo = ({ user }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (user?.id) {
            setTitle(`Rp${user?.revenue}`);
            setDescription('You have earned so far');
        } else {
            setTitle(`Welcome to the shop!`);
            setDescription('Share links to earn money.');
        }
    }, [user])
    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 rounded-lg mt-24 justify-end">
                <div className="px-6">
                    <div className="flex flex-wrap justify-center">
                        <div className="w-full px-4 flex justify-center items-center">
                            <div className='relative'>
                                <img
                                    alt="Avatar"
                                    src="/images/user.png"
                                    className="shadow-xl rounded-full align-middle border-none w-44 h-44"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="text-center mt-8">
                        <h3 className="text-xl font-semibold leading-normal text-blueGray-700 mb-2">
                            {user?.fullName}
                        </h3>
                    </div>
                    <div className="text-start mt-4">
                        <div className="mb-2 text-blueGray-600">
                            <i className="fa-solid fa-envelope mr-2 text-lg"></i>
                            {user?.email}
                        </div>
                        <div className="mb-2 text-blueGray-600">
                            <i className="fa-solid fa-user mr-2 text-lg"></i>
                            {user?.username}
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default connect(
    (state) => {
        return {
            user: state.user.user
        }
    }
)(UserInfo);