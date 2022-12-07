import { configureStore } from "@reduxjs/toolkit";
import { ListSlice } from "../reducer/categoryList";
import { UserSlice } from "../reducer/userSlice";

const store = configureStore({
    reducer: {
        listReducer: ListSlice.reducer,
        userReducer: UserSlice,
    }
});

export default store;
