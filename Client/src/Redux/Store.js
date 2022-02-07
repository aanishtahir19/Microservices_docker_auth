import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Components/Auth/AuthSlice';

export default configureStore({ reducer: { auth: authReducer } });
