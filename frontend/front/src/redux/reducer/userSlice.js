import { createSlice } from '@reduxjs/toolkit';

export const UserSlice = createSlice({
  name: 'user',
  initialState: {
    userId: '',
    username: '',
    userImg: '',
    isLoggedIn: false,
    isSocialLogin: false,
  },
  reducers: {
    loginUser: (state, action) => {
      state.userId = action.payload.userId;
      state.username = action.payload.username;
      state.isLoggedIn = action.payload.isLoggedIn;
      state.isSocialLogin = action.payload.isSocialLogin;
    },

    logoutUser: state => {
      state.userId = '';
      state.username = '';
      state.userImg = '';
      state.isLoggedIn = false;
      state.isSocialLogin = false;
    },

    saveUserImg: (state, action) => {
      state.userImg = action.payload.userImg;
    },
  },
});

export const { loginUser, logoutUser, saveUserImg } = UserSlice.actions;

export default UserSlice.reducer;
