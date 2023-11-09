import React from 'react'

const SmallError = ({ error }) => {
    return (
        <>
            {Array.isArray(error) ? error.map((err, index) => (
                <div className="text-red-500 text-xs mt-1" key={index}>{err}</div>
            )) : (
                error && (
                    <div className="text-red-500 text-xs mt-1">{error}</div>
                )
            )}
        </>
    )
}

export default SmallError