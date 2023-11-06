export const setProducts = (products, lastPage) => {
    return {
        type: 'SET_PRODUCTS',
        products,
        lastPage
    }
}
