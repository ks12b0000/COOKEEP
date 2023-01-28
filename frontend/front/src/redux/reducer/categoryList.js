import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { categoryList1 } from "../../http/data/category1/categoryList1";
import Axios from "../../http/http";

//
// const asyncList = createAsyncThunk("ListSlice/asyncList", async () => {
//     const res = await Axios.get(`board/list?page=1&category=카테고리2`);
//     const {data} = res;
//     return data;
// });

export const ListSlice = createSlice({
    name: "list",
    initialState: {
        item: []
    }
    //     reducers:{
    //         setState:(state,action) => {
    //             state.item.push(action.payload);
    //         }
    //     }
    //
    //     // extraReducers: (builder) => {
    //     //     // builder.addCase(asyncList.pending, (state, action) => {
    //     //     //     state.status = "Loading";
    //     //     // });
    //     //     builder.addCase(asyncList.fulfilled, (state, action) => {
    //     //         state.item = action.payload
    //     //     });
    //     //     // builder.addCase(asyncList.rejected, (state, action) => {
    //     //     //     state.status = "fail";
    //     //     // });
    //     // }
});

// export const { setState } = ListSlice.actions;
// export {asyncList};
