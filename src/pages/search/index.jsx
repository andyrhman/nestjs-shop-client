import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '@/redux/actions/setProductsAction';
import axios from 'axios'
import Layout from '@/components/Layout'
import Wrapper from '@/components/Wrapper'
import Footer from '@/components/Footer'
import SEO from '@/components/SEO'
import Card from '@/components/Cards/Card';
import Sidebar from '@/components/Sidebar'
import ButtonForPaginate from '@/components/Cards/ButtonForPaginate'

const SearchIndex = () => {
    const pageTitle = `Search Products | ${process.env.siteTitle}`;
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.products);
    // * Price and Date
    const [checkedHighestPrice, setCheckedHighestPrice] = useState(false);
    const [checkedLowestPrice, setCheckedLowestPrice] = useState(false);

    const handleHighestPriceChecked = () => {
        setCheckedHighestPrice(!checkedHighestPrice);
        setCheckedLowestPrice(false); // Uncheck the other checkbox
    };

    const handleLowestPriceChecked = () => {
        setCheckedLowestPrice(!checkedLowestPrice);
        setCheckedHighestPrice(false); // Uncheck the other checkbox
    };

    const [checkedNewestDate, setCheckedNewestDate] = useState(false);
    const [checkedOldestDate, setCheckedOldestDate] = useState(false);

    const handleNewestDateChecked = () => {
        setCheckedNewestDate(!checkedNewestDate);
        setCheckedOldestDate(false); // Uncheck the other checkbox
    };

    const handleOldestDateChecked = () => {
        setCheckedOldestDate(!checkedOldestDate);
        setCheckedNewestDate(false); // Uncheck the other checkbox
    };
    // * Category and Variant
    const [categories, setCategories] = useState([]);
    const [variants, setVariants] = useState([]);

    const handleCategoryChange = (e) => {
        const category = e.target.value;
        if (categories.includes(category)) {
            setCategories(categories.filter(c => c !== category));
        } else {
            setCategories([...categories, category]);
        }
    };

    const handleVariantChange = (e) => {
        const variant = e.target.value;
        if (variants.includes(variant)) {
            setVariants(variants.filter(v => v !== variant));
        } else {
            setVariants([...variants, variant]);
        }
    };
    // * Show all products
    useEffect(() => {
        (
            async () => {
                try {
                    const arr = [];
                    if (categories.length) {
                        arr.push(`filterByCategory=${categories.join(',')}`)
                    }
                    if (variants.length) {
                        arr.push(`filterByVariant=${variants.join(',')}`)
                    }
                    if (checkedHighestPrice) {
                        arr.push(`sortByPrice=asc`)
                    }
                    if (checkedLowestPrice) {
                        arr.push(`sortByPrice=desc`)
                    }
                    if (checkedNewestDate) {
                        arr.push(`sortByDate=newest`)
                    }
                    if (checkedOldestDate) {
                        arr.push(`sortByDate=oldest`)
                    }
                    const { data } = await axios.get(`products?${arr.join('&')}`)
                    dispatch(setProducts(data));
                } catch (error) {
                    if (error.response && error.response.status === 401) {
                        console.log(error);
                    }

                    if (error.response && error.response.status === 403) {
                        console.log(error);
                    }

                    if (error.response && error.response.status === 404) {
                        console.log(error);
                    }
                }
            }
        )();
    }, [categories, variants, checkedHighestPrice, checkedLowestPrice, checkedNewestDate, checkedOldestDate])
    // * Get All Variants and categories
    const [getVariants, setGetVariants] = useState([]);
    const [getCategories, setGetCategories] = useState([]);
    useEffect(() => {
        (
            async () => {
                try {
                    const { data: variantData } = await axios.get('variants');
                    // * Display unique product variant names (without repetition) 
                    // ? https://www.phind.com/search?cache=mnr17wlwqumusah7cbhriotn
                    const uniqueVariants = variantData.filter((v, i, a) => a.findIndex(t => (t.name === v.name)) === i);
                    setGetVariants(uniqueVariants);

                    const { data: categoryData } = await axios.get('categories');
                    setGetCategories(categoryData);
                } catch (error) {
                    if (error.response && error.response.status === 401) {
                        console.log(error);
                    }

                    if (error.response && error.response.status === 403) {
                        console.log(error);
                    }

                    if (error.response && error.response.status === 404) {
                        console.log(error);
                    }
                }
            }
        )();
    }, [])

    const [showSidebar, setShowSidebar] = useState(false);

    const handleSidebarToggle = () => {
        setShowSidebar(!showSidebar);
    };
    return (
        <Layout>
            <SEO title={pageTitle} />
            <Wrapper>
                <div className="flex flex-col md:flex-row justify-between">
                    <button className="md:hidden" onClick={handleSidebarToggle}>
                        Filters
                    </button>
                    <div className={`w-full md:w-64 mt-8 md:mt-0 ${showSidebar ? 'block' : 'hidden'} md:block md:fixed md:inset-y-0 md:left-0 md:overflow-auto md:h-screen`}>
                        <Sidebar
                            checkedPrice={checkedHighestPrice}
                            handlePriceChecked={() => handleHighestPriceChecked()}
                            checkedPriceLow={checkedLowestPrice}
                            handlePriceCheckedLow={() => handleLowestPriceChecked()}
                            checkedDateNewest={checkedNewestDate}
                            handleDateCheckedNewest={() => handleNewestDateChecked()}
                            checkedDateOldest={checkedOldestDate}
                            handleDateCheckedOldest={() => handleOldestDateChecked()}
                            getVariants={getVariants}
                            getCategories={getCategories}
                            handleCategoryChange={handleCategoryChange}
                            handleVariantChange={handleVariantChange}
                        />
                    </div>
                    <div className="w-full md:w-3/4 md:mr-8 md:ml-64 md:pl-8">
                        <Card products={products} />
                        <ButtonForPaginate />
                    </div>
                </div>
                <Footer />
            </Wrapper>
        </Layout>
    )
}

export default SearchIndex