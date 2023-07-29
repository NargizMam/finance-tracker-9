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
export const fetchOneCategory = createAsyncThunk<any, string>(
    'categories/fetchOne',
    async (id) => {
        const response = await axiosApi.get<Category | null>('/categories/' + id +'.json');
        const category = response.data;
        if(!category){
            return
        }
        return category;

    }
);
export const createCategory = createAsyncThunk<void, ApiCategory>(
    'categories/create',
    async (newCategory)=> {
        await axiosApi.post('/categories.json', newCategory);
    }
);
interface UpdateCategoryParams {
    id: string,
    category: Category
}
export const updateCategory = createAsyncThunk<void, UpdateCategoryParams>(
    'categories/update',
    async (params)=> {
        await axiosApi.put('/finances/categories/' + params.id + '.json' , params.category);
    }
);

export const deleteCategory = createAsyncThunk<void, string>(
    'categories/delete',
    async (id) => {
        await axiosApi.delete('/finances/categories/' + id + '.json');
    }
);