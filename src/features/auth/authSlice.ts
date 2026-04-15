import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthData, AuthState, User } from "@/types";

const initialState: AuthState = {
  user: null,
  token: null,
  expiresAt: null,
  isAuthenticated: false,
  isHydrated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthData>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.expiresAt = action.payload.expires_at;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.expiresAt = null;
      state.isAuthenticated = false;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isAuthenticated = Boolean(action.payload && state.token);
    },
    setHydrated: (state, action: PayloadAction<boolean>) => {
      state.isHydrated = action.payload;
    },
  },
});

export const { setCredentials, logout, setUser, setHydrated } = authSlice.actions;
export default authSlice.reducer;
