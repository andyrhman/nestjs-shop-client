import React from 'react';
import axios from 'axios';
import Layout from '@/components/Layout'; // Your custom layout component
import SEO from '@/components/SEO';
import { configStore } from '@/redux/configureStore';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/globals.css'; // Your global CSS file
import "@fortawesome/fontawesome-free/css/all.min.css";

axios.defaults.baseURL = process.env.SERVER_ENDPOINT;
axios.defaults.withCredentials = true;

const store = configStore();

function MyApp({ Component, pageProps }) {
    return (
        <Layout>
            <Provider store={store}>
                <SEO
                    title={process.env.siteTitle}
                />
                <ToastContainer />
                <Component {...pageProps} />
            </Provider>
        </Layout>
    );
}

export default MyApp;