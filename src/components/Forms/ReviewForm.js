import React, { useState } from 'react'
import dynamic from 'next/dynamic';
import axios from 'axios';
import SmallError from '../Alert/SmallError';
import ImageUploads from './ImageUpload';

const StarRatings = dynamic(() => import('react-star-ratings'), { ssr: false });

const ReviewForm = ({ productId }) => {
    const [hideReview, setHideReview] = useState(false);
    const [hideImage, setHideImage] = useState(false);
    const [star, setStar] = useState(0);

    const [comment, setComment] = useState('');
    const [image, setImage] = useState('');
    const [error, setError] = useState('');

    const submit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('review', {
                star: parseInt(star, 10),
                comment,
                image,
                product_id: productId
            })
            window.location.reload();
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                const errorMessage = error.response.data.message;
                setError(errorMessage);
            }
        }
    }
    const handleStarClick = (nextValue, prevValue, name) => {
        setStar(nextValue);
        console.log(`The rating is now ${nextValue}`);
    }
    return (
        <>
            {hideReview ?
                <div className='flex flex-col'>
                    <form>
                        <SmallError error={error} />
                        <div className='mb-5'>
                            <StarRatings
                                rating={star}
                                changeRating={handleStarClick}
                                starDimension="18px"
                                starSpacing="2px"
                                starRatedColor="gold"
                                starEmptyColor="gray"
                                numberOfStars={5}
                                name='rating'
                            />
                        </div>

                        <div className='mb-5'>
                            <textarea
                                className="textarea textarea-bordered w-full"
                                placeholder="Write your review"
                                onChange={(e) => setComment(e.target.value)}
                            >
                            </textarea>
                        </div>

                        {hideImage ?
                            <div className='mb-5'>
                                <label className="label">
                                    <span className="label-text">Image</span>
                                </label>
                                {image ? <img src={image} alt='image' width={200} height={200} className='h-auto max-w-full rounded-lg' /> : null}
                                <input
                                    className='hidden'
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                />
                                <ImageUploads uploaded={setImage} />
                            </div>
                            : null
                        }
                    </form>
                    <div className='flex flex-col items-end'>
                        <button className='btn btn-sm btn-info w-44 mb-2' onClick={() => setHideImage(!hideImage)}>Upload Image</button>
                        <button className='btn btn-sm btn-success w-44' onClick={submit}>Submit Reviews</button>
                    </div>
                </div>
                :
                <button className='btn btn-sm btn-info btn-block' onClick={() => setHideReview(!hideReview)}>Write A Review</button>
            }
        </>
    )
}

export default ReviewForm