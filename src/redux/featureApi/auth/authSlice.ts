// import { RootState } from "@/redux/store";
// import { TAutState, TUser } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";


export interface TUser {
  id: string;
  name: string;
  img?: string;
  email: string;
  password: string;
  role: string;
  iat: number;
  exp: number;
}

type TAuthState = {
  user: TUser | null;
  token: null | string;
};

const initialState: TAuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // setUser: (
    //   state,
    //   action: PayloadAction<{ user: TUser | null; token: string | null }>
    // ) => {
    //   const { user, token } = action.payload;
    //   state.user = user;
    //   state.token = token;
    // },

    setUser: (state, action) => {
      const { user, token } = action.payload;

      state.user = user;
      state.token = token;
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
    },
    // updateUserInfo: (state, action: PayloadAction<Partial<TUser>>) => {
    //   if (state.user) {
    //     state.user = { ...state.user, ...action.payload };
    //   }
    // },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;

export const useCurrentToken = (state: RootState) => state.auth.token;
export const useCurrentUser = (state: RootState) => state.auth.user;

// export const isAuthenticated = (state: RootState) => !!state.auth.token;
