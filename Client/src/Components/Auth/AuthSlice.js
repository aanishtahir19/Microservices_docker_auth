import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../Services/AxiosConfig';
import Cookies from 'js-cookie';
import GoogleLogin from '../../Services/GoogleLogin';
let initialState = { authorized: false, authorizing: false };
export const signupThunk = createAsyncThunk(
  'auth/signup',
  async (signupData, thunkAPI) => {
    const response = await axios.post('/auth/signup', signupData, {
      withCredentials: true,
      headers: {
        // 'Access-Control-Allow-Credentials': true,
      },
    });
    const refreshToken = -(await Cookies.get('refreshToken'));
    console.log(refreshToken);
    console.log(response);
    return response.data;
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
