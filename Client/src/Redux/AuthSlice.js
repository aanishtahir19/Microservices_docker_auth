import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../Services/AxiosConfig';
import Cookies from 'js-cookie';
import GoogleLogin from '../Services/GoogleLogin';
import getRoles from '../Helpers/getRoles';
let initialState = { authorized: false, authorizing: false };
export const signupThunk = createAsyncThunk(
  'auth/signup',
  async (signupData, thunkAPI) => {
    try {
      const { data } = await axios.post('/auth/signup', signupData, {
        withCredentials: true,
      });
      localStorage.setItem('accessToken', data.accessToken);
      const roles = getRoles(data.accessToken);
      return roles;
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue(error);
    }
  }
);
export const googleLogin = createAsyncThunk(
  'auth/googleLogin',
  async (id_token, thunkAPI) => {
    try {
      const { data, error } = await GoogleLogin({
        id_token,
      });
      if (error) throw new Error(error.message);
      console.log(data);
      const { accessToken } = data;
      if (!accessToken) throw new Error('No access token');
      localStorage.setItem('accessToken', accessToken);
      // dispatch(signupThunk({access_token}));
      return null;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);
const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    increment(state) {
      state.value++;
    },
    decrement(state) {
      state.value--;
    },
    incrementByAmount(state, action) {
      state.value += action.payload;
    },
  },
  extraReducers: {
    [signupThunk.pending]: (state) => {
      state.authorized = false;
      state.authorizing = true;
    },
    [signupThunk.fulfilled]: (state, { payload }) => {
      state.authorized = true;
      state.authorizing = false;
      state.roles = payload;
    },
    [signupThunk.rejected]: (state) => {
      state.authorized = false;
      state.authorizing = false;
    },
    [googleLogin.pending]: (state) => {
      state.authorized = false;
      state.authorizing = true;
    },
    [googleLogin.fulfilled]: (state) => {
      state.authorized = true;
      state.authorizing = false;
    },
    [googleLogin.rejected]: (state) => {
      state.authorized = false;
      state.authorizing = false;
    },
  },
});

export const { increment, decrement, incrementByAmount } = auth.actions;
export default auth.reducer;
