import {configureStore} from "@reduxjs/toolkit";
import {categoriesReducer} from "../store/CategoriesSlice";
import {transactionsReducers} from "../store/TransactionsSlice";

export const store = configureStore({
    reducer: {
        categories: categoriesReducer,
        transactions: transactionsReducers
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;