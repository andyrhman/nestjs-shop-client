import React, { useState } from 'react'
import { formatDistanceToNow } from 'date-fns';
import { UserIcon } from '@heroicons/react/24/solid'
import dynamic from 'next/dynamic';

const StarRatings = dynamic(() => import('react-star-ratings'), { ssr: false });

const Review = ({ reviews }) => {
    const reviewsPerPage = 2;
    const [loadedPages, setLoadedPages] = useState(1);

    const handleClick = () => {
        setLoadedPages(loadedPages + 1);
    }

    // Sort reviews by 'created_at' in descending order
    const sortedReviews = [...reviews].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    const endIndex = loadedPages * reviewsPerPage;
    const currentReviews = sortedReviews.slice(0, endIndex);

    return (
        <>
            <ul className="">
                {currentReviews.map((r) => (
                    <li className="py-8 text-left px-4 m-2" key={r.id}>
                        <div className="flex items-start">
                            <UserIcon strokeWidth={2} className="block h-10 w-10 max-w-full flex-shrink-0 rounded-full align-middle" />
                            <div className="ml-6">
                                <div className="flex items-center">
                                    <StarRatings
                                        rating={r.star}
                                        starDimension="18px"
                                        starSpacing="2px"
                                        starRatedColor="gold"
                                        starEmptyColor="gray"
                                        numberOfStars={5}
                                        name='rating'
                                    />
                                </div>
                                <p className="mt-5 text-base text-gray-900">{r.comment}</p>
                                <p className="mt-5 text-sm font-bold text-gray-900">{r.user.fullName}</p>
                                <p className="mt-1 text-sm text-gray-600">{formatDistanceToNow(new Date(r.created_at))} ago</p>
                            </div>
                        </div>
                    </li>
                ))}
                {endIndex < reviews.length && (
                    <button className='btn btn-sm btn-primary' onClick={handleClick}>Load More</button>
                )}
            </ul>
        </>
    )
}

export default Review