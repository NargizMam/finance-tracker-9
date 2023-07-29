import {createAsyncThunk} from "@reduxjs/toolkit";
import {ApiTransaction, ApiTransactionsList, FetchTransactionsResult, Transaction} from "../type";
import axiosApi from "../axiosApi";
import {AppDispatch, RootState} from "../app/store";
import {fetchCategories} from "./CategoriesThunk";

export const createTransactions = createAsyncThunk<void, ApiTransaction>(
    'transactions/create',
    async (transaction) => {
        await axiosApi.post('/transactions.json', transaction)
    }
);
export const fetchTransactions = createAsyncThunk<FetchTransactionsResult, void, {dispatch: AppDispatch, state: RootState}>(
    'transactions/fetchAll',
    async (_, thunkAPI) => {
        await thunkAPI.dispatch(fetchCategories);
        const response = await axiosApi.get<ApiTransactionsList | null>('/transactions.json');
        const transactions = response.data;
        if(!transactions){
            return {
                transactions: [],
                total: 0
            }
        }
        const categories = thunkAPI.getState().categories.items;
        const newTransactions: Transaction[] = [];
        let total = 0;
            Object.keys(transactions).forEach(id => {
                const transaction = transactions[id];
                const category = categories.find(category =>category.id === transaction.categoryId)
                if(!category){
                    return
                }
                newTransactions.push({
                    id,
                    category,
                    createdAt: transaction.createdAt,
                    amount: transaction.amount
                });
                if(category.type ==='expense'){
                    total -= transaction.amount
                }else {
                    total += transaction.amount
                }
            });
        return {
            transactions: newTransactions,
            total
        }
    }
);