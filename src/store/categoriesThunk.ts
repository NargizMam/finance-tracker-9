import {createAsyncThunk} from "@reduxjs/toolkit";
import {ApiCategoriesList, Category} from "../type";
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