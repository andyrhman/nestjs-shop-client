import { SetUserReducer } from './reducers/setUserReducer';
import { SetProductsReducer } from './reducers/setProductsReducer';
import { configureStore } from '@reduxjs/toolkit';

export const configStore = () => {
    return configureStore({
        reducer: {
            user: SetUserReducer,
            products: SetProductsReducer
        }
    });
}
