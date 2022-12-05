import { configureStore } from "@reduxjs/toolkit";
import { ListSlice } from "../reducer/categoryList";

const store = configureStore({
    reducer: {
        listReducer: ListSlice.reducer
    }
});

export default store;
