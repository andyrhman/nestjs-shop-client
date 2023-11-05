import React from 'react'
import Image from 'next/image'

const products = [
    {
        id: 1,
        title: 'Blog Post 1',
        categories: 'Education',
        description:
            'Lorem ipsum dolor sit amet',
        image: 'https://via.placeholder.com/300'
    },
    {
        id: 2,
        title: 'Blog Post 2',
        categories: 'Life Style',
        description:
            'Praesent pharetra nisl',
        image: 'https://via.placeholder.com/300'
    },
];

const Card = ({ title, categories, description, uploader, image }) => {
    return (

        <div className="card w-full bg-base-100 shadow-xl md:w-11/12 ">
            <figure>                
                <Image src={image} width={300} height={300} priority={true} alt="Blog Post"/>
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                    {title}
                </h2>
                <p>{description}</p>
                <div className="card-actions justify-end">
                    <div className="badge badge-outline">Rp 3000</div>
                </div>
            </div>
        </div>
    )
}

export { Card, products };