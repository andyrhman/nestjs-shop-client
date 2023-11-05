import React from 'react';
import Link from 'next/link';
import UserDropdown from './UserDropdown';
import { ArrowLeftOnRectangleIcon, UserPlusIcon } from '@heroicons/react/24/solid';
import { connect } from "react-redux";

const Navbar = ({ user }) => {
    return (
        <>
            <div className="navbar bg-base-100">
                <div className='navbar-start'>
                    <Link href={"/"} className="btn btn-ghost normal-case text-xl">Shopyfy</Link>
                </div>
                <div className='navbar-end'>
                    {user ? (
                        <>
                            <UserDropdown info={user?.fullName}/>
                        </>
                    ) : (
                        <>
                            <div className="dropdown dropdown-end lg:flex mr-4">
                                <Link href={'/login'} className="btn btn-sm btn-success">
                                    <ArrowLeftOnRectangleIcon strokeWidth={2} className="h-6 w-6" />
                                    Login
                                </Link>
                            </div>
                            <div className="dropdown dropdown-end lg:flex">
                                <Link href={'/register'} className="btn btn-sm btn-neutral">
                                    <UserPlusIcon strokeWidth={2} className="h-6 w-6" />
                                    Register
                                </Link>
                            </div>
                        </>
                    )}

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
)(Navbar);