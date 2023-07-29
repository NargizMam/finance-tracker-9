import {createSlice} from "@reduxjs/toolkit";
import {Transaction} from "../type";
import {RootState} from "../app/store";

interface TransactionState {
    items: Transaction[];
    total: number;
    modalOpen: boolean;
}

const initialState: TransactionState = {
    items: [],
    total: 0,
    modalOpen: false
}
export const transactionsSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {}
});

export const transactionsReducers = transactionsSlice.reducer;
export const selectTransactions = (state: RootState) => state.transactions.items;
export const selectTotal = (state: RootState) => state.transactions.total;
export const selectModalOpen = (state: RootState) => state.transactions.modalOpen;
