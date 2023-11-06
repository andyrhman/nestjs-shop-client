export const SetProductsReducer = (state = {}, action) => {
    switch (action.type) {
        case "SET_PRODUCTS":
            return {
                ...state,
                products: action.products
            };
        default:
            return state;
    }
}
