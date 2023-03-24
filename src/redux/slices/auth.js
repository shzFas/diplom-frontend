import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

/* Преподаватель, Админка */

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params) => {
  const { data } = await axios.post('/auth/login', params);
  return data;
});

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params) => {
  const { data } = await axios.post('/auth/register', params);
  return data;
});

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
  const { data } = await axios.get('/auth/me');
  return data;
});

/* Ученик */

export const fetchAuthStudent = createAsyncThunk('authStudent/fetchAuthStudent', async (params) => {
  const { data } = await axios.post('/auth/loginStudent', params);
  return data;
});

export const fetchAuthStudentMe = createAsyncThunk('authStudent/fetchAuthStudentMe', async () => {
  const { data } = await axios.get('/auth/student/me');
  return data;
});

const initialState = {
  data: null,
  status: 'loading',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: {
    [fetchAuth.pending]: (state) => {
      state.status = 'loading';
      state.data = null;
    },
    [fetchAuth.fulfilled]: (state, action) => {
      state.status = 'loaded';
      state.data = action.payload;
    },
    [fetchAuth.rejected]: (state) => {
      state.status = 'error';
      state.data = null;
    },
    [fetchAuthMe.pending]: (state) => {
      state.status = 'loading';
      state.data = null;
    },
    [fetchAuthMe.fulfilled]: (state, action) => {
      state.status = 'loaded';
      state.data = action.payload;
    },
    [fetchAuthMe.rejected]: (state) => {
      state.status = 'error';
      state.data = null;
    },
    [fetchRegister.pending]: (state) => {
      state.status = 'loading';
      state.data = null;
    },
    [fetchRegister.fulfilled]: (state, action) => {
      state.status = 'loaded';
      state.data = action.payload;
    },
    [fetchRegister.rejected]: (state) => {
      state.status = 'error';
      state.data = null;
    },
  },
});

const authSliceStudent = createSlice({
  name: 'authStudent',
  initialState,
  reducers: {
    logoutStudent: (state) => {
      state.data = null;
    },
  },
  extraReducers: {
    [fetchAuthStudent.pending]: (state) => {
      state.status = 'loading';
      state.data = null;
    },
    [fetchAuthStudent.fulfilled]: (state, action) => {
      state.status = 'loaded';
      state.data = action.payload;
    },
    [fetchAuthStudent.rejected]: (state) => {
      state.status = 'error';
      state.data = null;
    },
    [fetchAuthStudentMe.pending]: (state) => {
      state.status = 'loading';
      state.data = null;
    },
    [fetchAuthStudentMe.fulfilled]: (state, action) => {
      state.status = 'loaded';
      state.data = action.payload;
    },
    [fetchAuthStudentMe.rejected]: (state) => {
      state.status = 'error';
      state.data = null;
    },
  },
});

export const selectIsAuthStudent = (state) => Boolean(state.authStudent.data);

export const selectIsAuth = (state) => Boolean(state.auth.data);

export const authStudentReducer = authSliceStudent.reducer;
export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
export const { logoutStudent } = authSliceStudent.actions;
