import {createSlice} from "@reduxjs/toolkit";
import {useAppSelector} from "../../app/hooks";
import {RootState} from "../../app/store";

interface modalState {
    show: boolean
}
const initialState: modalState = {
    show: false
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        isShow: (state) => {
            state.show = true
        },
        isClose: (state) => {
            state.show = false;
        }
    }
});

export const modalReducer = modalSlice.reducer;
export const selectShowModal = (state: RootState) => state.modal.show;
export const {isShow, isClose}  =  modalSlice.actions;
