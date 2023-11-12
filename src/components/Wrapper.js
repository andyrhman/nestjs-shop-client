import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { setUser } from "@/redux/actions/setUserAction";
import { setProducts } from "@/redux/actions/setProductsAction";
import Layout from "./Layout";
import Navbar from './Navbar';
import axios from "axios";

const Wrapper = (props) => {
    const [error, setError] = useState('')
    const perPage = 10;
    useEffect(() => {
        (
            async () => {
                try {
                    const { data: userData } = await axios.get('user');
                    props.setUser(userData);
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
                try {
                    // ? https://www.phind.com/search?cache=g1op1bxyan4knygpnirea0ou
                    const { data: productsData } = await axios.get('products');
                    const lastPage = Math.ceil(productsData.length / perPage);
                    props.setProducts(productsData.slice(0, perPage), lastPage);
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
        )()

    }, [])
    return (
        <Layout>
            <Navbar />
            {props.children}
        </Layout>
    )
}

const mapStateToProps = (state) => {
    // console.log(state.user); // * Always console log first for showing the response data
    return {
        user: state.user.user,
        products: state.products.products,
        lastPage: state.products.lastPage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUser: (user) => dispatch(setUser(user)),
        setProducts: (products, lastPage) => dispatch(setProducts(products, lastPage))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);