import {createSlice} from "@reduxjs/toolkit";
import {
    createTransactions,
    deleteTransaction,
    fetchOneTransaction,
    fetchTransactions,
    updateTransaction
} from "./TransactionsThunks";
import {RootState} from "../app/store";
import {ApiTransaction, Transaction} from "../type";


interface TransactionState {
    items: Transaction[];
    oneTransaction: ApiTransaction | null;
    total: number;
    createLoading: boolean;
    fetchLoading: boolean;
    updateLoading: boolean,
    deleteLoading: false | string;

    modalOpen: boolean;
}

const initialState: TransactionState = {
    items: [],
    oneTransaction: null,
    total: 0,
    createLoading: false,
    fetchLoading: false,
    modalOpen: false,
    updateLoading: false,
    deleteLoading: false,
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
        builder.addCase(fetchOneTransaction.pending, (state) => {
            state.createLoading = true;
        });
        builder.addCase(fetchOneTransaction.fulfilled, (state, {payload}) => {
            state.createLoading = false;
            state.oneTransaction = payload;
        });
        builder.addCase(fetchOneTransaction.rejected, (state) => {
            state.createLoading = false;
        });
        builder.addCase(updateTransaction.pending, (state) => {
            state.updateLoading = true;
        });
        builder.addCase(updateTransaction.fulfilled, (state) => {
            state.updateLoading = false;
        });
        builder.addCase(updateTransaction.rejected, (state) => {
            state.updateLoading = false;
        });
        builder.addCase(deleteTransaction.pending, (state, {meta: {arg: dishId}}) => {
            state.deleteLoading = dishId;
        });
        builder.addCase(deleteTransaction.fulfilled, (state) => {
            state.deleteLoading = false;
        });
        builder.addCase(deleteTransaction.rejected, (state) => {
            state.deleteLoading = false;
        });
    }
});

export const transactionsReducers = transactionsSlice.reducer;
export const {openModal, closeModal} = transactionsSlice.actions;
export const selectTransactions = (state: RootState) => state.transactions.items;
export const selectFetchOneTransaction = (state: RootState) => state.transactions.oneTransaction;
export  const selectCreateLoading = (state: RootState) => state.transactions.createLoading;
export  const selectFetchLoading = (state: RootState) => state.transactions.fetchLoading;
export const selectTransactionUpdateLoading = (state:RootState) => state.transactions.updateLoading;
export const selectTransactionDeleteLoading = (state: RootState) => state.transactions.deleteLoading;
export const selectTotal = (state: RootState) => state.transactions.total;
export const selectModalOpen = (state: RootState) => state.transactions.modalOpen;
