import {createSlice} from "@reduxjs/toolkit";
import {Category} from "../type";
import {RootState} from "../app/store";
import {createCategory, deleteCategory, fetchCategories, fetchOneCategory, updateCategory} from "./CategoriesThunk";

interface CategoriesState {
    items: Category[];
    oneCategory: Category | null;
    fetchLoading: boolean;
    createLoading: boolean;
    updateLoading: boolean;
    deleteLoading: boolean;
    modalOpen: boolean;
}
const initialState: CategoriesState = {
    items: [],
    oneCategory: null,
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
        builder.addCase(fetchOneCategory.pending, (state) => {
            state.createLoading = true;
        });
        builder.addCase(fetchOneCategory.fulfilled, (state, {payload}) => {
            state.createLoading = false;
            state.oneCategory = payload;
        });
        builder.addCase(fetchOneCategory.rejected, (state) => {
            state.createLoading = false;
        });builder.addCase(createCategory.pending, (state) => {
            state.createLoading = true;
        });
        builder.addCase(createCategory.fulfilled, (state) => {
            state.createLoading = false;
        });
        builder.addCase(createCategory.rejected, (state) => {
            state.createLoading = false;
        });
        builder.addCase(updateCategory.pending, (state) => {
            state.updateLoading = true;
        });
        builder.addCase(updateCategory.fulfilled, (state) => {
            state.updateLoading = false;
        });
        builder.addCase(updateCategory.rejected, (state) => {
            state.updateLoading = false;
        });
        builder.addCase(deleteCategory.pending, (state) => {
            state.deleteLoading = true;
        });
        builder.addCase(deleteCategory.fulfilled, (state) => {
            state.deleteLoading = false;
        });
        builder.addCase(deleteCategory.rejected, (state) => {
            state.deleteLoading = false;
        });
    }
});
export const categoriesReducer = CategoriesSlice.reducer;
export const {openCategoriesModal, closeCategoriesModal} = CategoriesSlice.actions;

export const selectCategories = (state: RootState) => state.categories.items;
export const selectFetchOneCategory= (state: RootState) => state.categories.oneCategory;

export const selectCategoriesModal = (state: RootState) => state.categories.modalOpen;
export const selectFetchCategoriesLoading = (state: RootState) => state.categories.fetchLoading;
export const selectCreateCategoriesLoading = (state: RootState) => state.categories.fetchLoading;
export const selectCategoriesUpdateLoading = (state:RootState) => state.categories.updateLoading;
export const selectCategoriesDeleteLoading = (state: RootState) => state.categories.deleteLoading;