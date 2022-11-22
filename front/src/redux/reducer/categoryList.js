import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { categoryList1 } from "../../data/category1/categoryList1";

const asyncList = createAsyncThunk("ListSlice/asyncList", async () => {
    // const resp = await axios.get("url");
    // return resp.data;
});

export const ListSlice = createSlice({
    name: "list",
    initialState: {
        item: [categoryList1],
        status: "stop"
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(asyncList.pending, (state, action) => {
            state.status = "Loading";
        });
        builder.addCase(asyncList.fulfilled, (state, action) => {
            state.item = action.payload;
            state.status = "complete";
        });
        builder.addCase(asyncList.rejected, (state, action) => {
            state.status = "fail";
        });
    }
});

export const { set } = ListSlice.actions;
