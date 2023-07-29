import {createSlice} from "@reduxjs/toolkit";
import {Category} from "../type";
import {RootState} from "../app/store";
import {fetchCategories} from "./CategoriesThunk";

interface CategoriesState {
    items: Category[];
    fetchLoading: boolean;
}
const initialState: CategoriesState = {
    items: [],
    fetchLoading: false,
}
export const CategoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCategories.pending, (state) => {
            state.fetchLoading = true;
        });
        builder.addCase(fetchCategories.fulfilled, (state, {payload : categories}) => {
            state.fetchLoading = false;
            state.items = categories;
        });
        builder.addCase(fetchCategories.rejected, (state, {payload : categories}) => {
            state.fetchLoading = false;
        });
    }
});
export const categoriesReducer = CategoriesSlice.reducer;
export const selectCategories = (state: RootState) => state.categories.items;
export const selectFetchCategoriesLoading = (state: RootState) => state.categories.fetchLoading;