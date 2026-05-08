import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    toastNotification: { visibility: false, type: "", title: "", message: "", timeOut: 3000 }
};

export const globalSlice = createSlice({
    name: "globalStore",
    initialState,
    reducers: {
        setToastNotification: (state, action) => {
            state.toastNotification = action.payload;
        }
    },
});


export const {
    setToastNotification,
} = globalSlice.actions;

export default globalSlice.reducer;
