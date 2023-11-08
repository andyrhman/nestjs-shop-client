import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios'
import Layout from '@/components/Layout'
import Wrapper from '@/components/Wrapper'
import Footer from '@/components/Footer'
import SEO from '@/components/SEO'
import SearchProduct from '@/components/Cards/SearchProduct'
import Sidebar from '@/components/Sidebar';
import NotFound from '@/components/Cards/NotFound'
import Pagination from '@/components/PaginationForSearch'
import Cookies from 'js-cookie';

const Search = ({ products, searchTerm }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(2);
    const [inputVisibleStart, setInputVisibleStart] = useState(false);
    const [inputVisibleEnd, setInputVisibleEnd] = useState(false);
    const [inputValueStart, setInputValueStart] = useState('');
    const [inputValueEnd, setInputValueEnd] = useState('');

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const pageTitle = `Search ${searchTerm} | ${process.env.siteTitle}`;
    const totalPages = Math.ceil(products.length / itemsPerPage);
    const start = Math.max(0, currentPage - 2);
    const end = Math.min(start + 5, totalPages);

    const currentItems = products.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

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
    const router = useRouter();

    useEffect(() => {
        const query = {};
        if (categories.length > 0) query.categories = categories.join(',');
        if (variants.length > 0) query.variants = variants.join(',');
        if (checkedHighestPrice) query.sortByPrice = 'asc';
        if (checkedLowestPrice) query.sortByPrice = 'desc';
        if (checkedNewestDate) query.sortByDate = 'newest';
        if (checkedOldestDate) query.sortByDate = 'oldest';
    
        router.replace({
            pathname: `/search/${searchTerm}`,
            query: query
        });
        setCurrentPage(0)
    }, [categories, variants, checkedHighestPrice, checkedLowestPrice, checkedNewestDate, checkedOldestDate]);    

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
    }, []);

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
                        {currentItems.length > 0 ? (
                            <>
                                <SearchProduct products={currentItems} />
                                <Pagination
                                    itemsPerPage={itemsPerPage}
                                    totalItems={products.length}
                                    paginate={handlePageChange}
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    start={start}
                                    end={end}
                                    setInputVisibleStart={setInputVisibleStart}
                                    setInputVisibleEnd={setInputVisibleEnd}
                                    inputVisibleStart={inputVisibleStart}
                                    inputVisibleEnd={inputVisibleEnd}
                                    inputValueStart={inputValueStart}
                                    inputValueEnd={inputValueEnd}
                                    setInputValueStart={setInputValueStart}
                                    setInputValueEnd={setInputValueEnd}
                                />
                            </>
                        ) : (
                            <NotFound searchValue={searchTerm} />
                        )}
                        <Footer />
                    </div>
                </div>
            </Wrapper>
        </Layout>
    )
}

export const getServerSideProps = async (context) => {
    const searchTerm = context.params.search;
    const { categories, variants, sortByPrice, sortByDate } = context.query;

    let query = `products?search=${searchTerm}`;

    if (categories) {
        query += `&filterByCategory=${categories}`;
    }
    if (variants) {
        query += `&filterByVariant=${variants}`;
    }
    if (sortByPrice) {
        query += `&sortByPrice=${sortByPrice}`;
    }
    if (sortByDate) {
        query += `&sortByDate=${sortByDate}`;
    }

    const { data: products } = await axios.get(query);
    return {
        props: {
            products,
            searchTerm
        }
    }
}

export default Search;