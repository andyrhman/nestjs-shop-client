import React, { useState } from 'react'
import axios from 'axios';
import { setProducts } from "@/redux/actions/setProductsAction";
import { connect } from "react-redux";

const ButtonForPaginate = ({ products, lastPage, setProducts }) => {
    const [page, setPage] = useState(1);
    const perPage = 9;
    const loadMore = async () => {
        if (page < lastPage) {
            try {
                const { data: productsData } = await axios.get('products');
                const newProducts = productsData.slice(page * perPage, (page + 1) * perPage);
                setProducts([...products, ...newProducts], lastPage);
                setPage(page + 1);
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    setError('An error occured')
                }

                if (error.response && error.response.status === 403) {
                    setError('An error occured')
                }

                if (error.response && error.response.status === 404) {
                    setError('An error occured')
                }
            }
        }
    }
    return (
        <>
            {page < lastPage &&
                <div className="flex flex-col justify-center pb-14">
                    <div className="w-full px-4 flex justify-center items-center">
                        <div className='relative'>
                            <button className='btn btn-primary btn-sm' onClick={loadMore}>Load More</button>
                        </div>
                    </div>
                </div>
            }
        </>

    )
}
const mapStateToProps = (state) => {
    return {
        products: state.products.products,
        lastPage: state.products.lastPage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setProducts: (products, lastPage) => dispatch(setProducts(products, lastPage))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ButtonForPaginate);