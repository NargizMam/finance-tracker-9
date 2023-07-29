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
    reducers: {
        openModal: (state) => {
            state.modalOpen = true;
        },
        closeModal: (state) => {
            state.modalOpen = false;
        }
    }
});

export const transactionsReducers = transactionsSlice.reducer;
export const {openModal, closeModal} = transactionsSlice.actions;
export const selectTransactions = (state: RootState) => state.transactions.items;
export const selectTotal = (state: RootState) => state.transactions.total;
export const selectModalOpen = (state: RootState) => state.transactions.modalOpen;
