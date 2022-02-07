import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../Services/AxiosConfig';
import Cookies from 'js-cookie';
let initialState = {};
export const signupThunk = createAsyncThunk(
  'auth/signup',
  async (signupData, thunkAPI) => {
    console.log('Aanish');
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
});

export const { increment, decrement, incrementByAmount } = auth.actions;
export default auth.reducer;
