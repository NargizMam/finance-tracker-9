import {createAsyncThunk} from "@reduxjs/toolkit";
import {ApiCategoriesList, ApiCategory, Category} from "../type";
import axiosApi from "../axiosApi";

export const fetchCategories = createAsyncThunk<Category[]>(
    'categories/fetchAll',
    async () => {
        const response = await axiosApi.get<ApiCategoriesList | null>('/categories.json');
        const categories = response.data;

        if(!categories){
            return [];
        }
        return Object.keys(categories).map(id => {
            return {
                ...categories[id],
                id
            }
        })
    }
);
export const createCategory = createAsyncThunk<void, ApiCategory>(
    'categories/create',
    async (newCategory)=> {
        await axiosApi.post('/categories.json', newCategory);
    }
);