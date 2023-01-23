import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
    name: "user",
    initialState: {
        userId: "",
        isLoggedIn: false,
        isSocialLogin: false,
    },
    reducers: {
        loginUser: (state, action) => {
            state.userId = action.payload.userId;
            state.isLoggedIn = action.payload.isLoggedIn;
            state.isSocialLogin = action.payload.isSocialLogin;
        },

        logoutUser: (state) => {
            state.userId = "";
            state.isLoggedIn = false;
            state.isSocialLogin = false;
        }
    }
});

export const { loginUser, logoutUser } = UserSlice.actions;

export default UserSlice.reducer;
