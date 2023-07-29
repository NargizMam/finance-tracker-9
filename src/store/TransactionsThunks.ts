import {createAsyncThunk} from "@reduxjs/toolkit";
import {ApiTransaction} from "../type";
import axiosApi from "../axiosApi";

export const createTransactions = createAsyncThunk<void, ApiTransaction>(
    'transactions/create',
    async (transaction) => {
        await axiosApi.post('/transactions.json', transaction)
    }
);