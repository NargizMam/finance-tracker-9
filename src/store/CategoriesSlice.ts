import {createSlice} from "@reduxjs/toolkit";
import {Category} from "../type";
import {RootState} from "../app/store";
import {createCategory, fetchCategories} from "./CategoriesThunk";
import {transactionsSlice} from "./TransactionsSlice";

interface CategoriesState {
    items: Category[];
    fetchLoading: boolean;
    createLoading: boolean;
    updateLoading: boolean;
    deleteLoading: boolean;
    modalOpen: boolean;
}
const initialState: CategoriesState = {
    items: [],
    fetchLoading: false,
    createLoading: false,
    updateLoading: false,
    deleteLoading: false,
    modalOpen: false,
}
export const CategoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        openCategoriesModal: (state) => {
            state.modalOpen = true;
        },
        closeCategoriesModal: (state) => {
            state.modalOpen = false;
        }
    },    extraReducers: (builder) => {
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
        builder.addCase(createCategory.pending, (state) => {
            state.createLoading = true;
        });
        builder.addCase(createCategory.fulfilled, (state) => {
            state.createLoading = false;
        });
        builder.addCase(createCategory.rejected, (state) => {
            state.createLoading = false;
        });
    }
});
export const categoriesReducer = CategoriesSlice.reducer;
export const {openCategoriesModal, closeCategoriesModal} = CategoriesSlice.actions;

export const selectCategories = (state: RootState) => state.categories.items;
export const selectCategoriesModal = (state: RootState) => state.categories.modalOpen;
export const selectFetchCategoriesLoading = (state: RootState) => state.categories.fetchLoading;
export const selectCreateCategoriesLoading = (state: RootState) => state.categories.fetchLoading;
