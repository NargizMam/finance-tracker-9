import { createSlice } from "@reduxjs/toolkit";
import {createTransactions, fetchTransactions} from "./TransactionsThunks";
import {RootState} from "../app/store";
import {Transaction} from "../type";


interface TransactionState {
    items: Transaction[];
    total: number;
    createLoading: boolean;
    fetchLoading: boolean;
    modalOpen: boolean;
}

const initialState: TransactionState = {
    items: [],
    total: 0,
    createLoading: false,
    fetchLoading: false,
    modalOpen: false
}
export const transactionsSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        openModal: (state) => {
            state.modalOpen = true;
        },
        closeModal: (state) => {
            state.modalOpen = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createTransactions.pending, (state) => {
            state.createLoading = true;
        });
        builder.addCase(createTransactions.fulfilled, (state) => {
            state.createLoading = false;
        });
        builder.addCase(createTransactions.rejected, (state) => {
            state.createLoading = false;
        });
        builder.addCase(fetchTransactions.pending, (state) => {
            state.fetchLoading = true;
        });
        builder.addCase(fetchTransactions.fulfilled, (state, {payload: {total, transactions}}) => {
            state.items = transactions;
            state.total = total;
            state.fetchLoading = false;

        });
        builder.addCase(fetchTransactions.rejected, (state) => {
            state.fetchLoading = false;
        });

    }
});

export const transactionsReducers = transactionsSlice.reducer;
export const {openModal, closeModal} = transactionsSlice.actions;
export const selectTransactions = (state: RootState) => state.transactions.items;
export  const selectCreateLoading = (state: RootState) => state.transactions.createLoading;
export  const selectFetchLoading = (state: RootState) => state.transactions.fetchLoading;
export const selectTotal = (state: RootState) => state.transactions.total;
export const selectModalOpen = (state: RootState) => state.transactions.modalOpen;
