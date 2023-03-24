import { configureStore } from '@reduxjs/toolkit';
import { authReducer, authStudentReducer } from './slices/auth';

const store = configureStore({
  reducer: {
    auth: authReducer,
    authStudent: authStudentReducer,
  },
});

export default store;
