// redux/slices/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isLoggedIn: boolean;
  error: string | null;
  isLoading: boolean;
}

const initialState: AuthState = {
  isLoggedIn: false,
  error: null,
  isLoading: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logInStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    logInSuccess: (state) => {
      state.isLoggedIn = true;
      state.isLoading = false;
    },
    logInFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logOut: (state) => {
      state.isLoggedIn = false;
      state.error = null;
    },
  },
});

export const { logInStart, logInSuccess, logInFailure, logOut } = authSlice.actions;

export default authSlice.reducer;