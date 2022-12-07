import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
    name: 'user',
    initialState: {
        userId : '',
        isLoggedIn : false,
    },
    reducers: {
        loginUser: (state, action) => {
            state.userId = action.payload.userId;
            state.isLoggedIn = action.payload.isLoggedIn;
        },

        logoutUser: (state) => {
            state.userId = '';
            state.isLoggedIn = false;
        }
    }
})

export const {loginUser, logoutUser} = UserSlice.actions;

export default UserSlice.reducer;