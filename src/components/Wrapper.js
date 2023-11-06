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

    useEffect(() => {
        (
            async () => {
                try {
                    const { data: userData } = await axios.get('user');
                    props.setUser(userData);

                    const { data: productsData } = await axios.get('products');
                    props.setProducts(productsData);
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
            <Navbar/>
            {props.children}
        </Layout>
    )
}

const mapStateToProps = (state) => {
    // console.log(state.user); // * Always console log first for showing the response data
    return {
        user: state.user.user,
        products: state.products.products
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUser: (user) => dispatch(setUser(user)),
        setProducts: (products) => dispatch(setProducts(products))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);