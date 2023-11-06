export const SetProductsReducer = (state = { products: [], lastPage: 1 }, action) => {
    switch (action.type) {
        case "SET_PRODUCTS":
            return {
                ...state,
                products: action.products,
                lastPage: action.lastPage
            };
        default:
            return state;
    }
}
