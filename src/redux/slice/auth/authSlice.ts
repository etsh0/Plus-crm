import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; // Optional for security reasons in current session, but stored in users list
  avatarUrl?: string;
}

export interface AuthState {
  users: User[];
  currentUser: User | null;
}

const getInitialAuthData = (): AuthState => {
  if (typeof window !== "undefined") {
    try {
      const storedUsers = localStorage.getItem("crm_users");
      const storedCurrentUser = localStorage.getItem("crm_currentUser");
      return {
        users: storedUsers ? JSON.parse(storedUsers) : [],
        currentUser: storedCurrentUser ? JSON.parse(storedCurrentUser) : null,
      };
    } catch (error) {
      console.error("Failed to parse auth data from localStorage:", error);
    }
  }
  return { users: [], currentUser: null };
};

const initialState: AuthState = getInitialAuthData();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerUser: (state, action: PayloadAction<User>) => {
      const existingUser = state.users.find((u) => u.email === action.payload.email);
      if (!existingUser) {
        state.users.push(action.payload);
        if (typeof window !== "undefined") {
          localStorage.setItem("crm_users", JSON.stringify(state.users));
        }
      }
    },
    loginUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("crm_currentUser", JSON.stringify(state.currentUser));
      }
    },
    logoutUser: (state) => {
      state.currentUser = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("crm_currentUser");
      }
    },
    updateProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.currentUser) {
        // Update current user
        state.currentUser = { ...state.currentUser, ...action.payload };
        
        // Update in users array
        const userIndex = state.users.findIndex((u) => u.id === state.currentUser!.id);
        if (userIndex !== -1) {
          state.users[userIndex] = { ...state.users[userIndex], ...action.payload };
        }

        if (typeof window !== "undefined") {
          localStorage.setItem("crm_currentUser", JSON.stringify(state.currentUser));
          localStorage.setItem("crm_users", JSON.stringify(state.users));
        }
      }
    },
    updatePassword: (state, action: PayloadAction<string>) => {
      if (state.currentUser) {
        // Update password in users array
        const userIndex = state.users.findIndex((u) => u.id === state.currentUser!.id);
        if (userIndex !== -1) {
          state.users[userIndex].password = action.payload;
          state.currentUser.password = action.payload; // Keep current user synced
        }

        if (typeof window !== "undefined") {
          localStorage.setItem("crm_users", JSON.stringify(state.users));
          localStorage.setItem("crm_currentUser", JSON.stringify(state.currentUser));
        }
      }
    },
    loadAuthData: (state) => {
      if (typeof window !== "undefined") {
        try {
          const storedUsers = localStorage.getItem("crm_users");
          const storedCurrentUser = localStorage.getItem("crm_currentUser");
          if (storedUsers) state.users = JSON.parse(storedUsers);
          if (storedCurrentUser) state.currentUser = JSON.parse(storedCurrentUser);
        } catch (error) {
          console.error("Error loading auth data", error);
        }
      }
    },
  },
});

export const { registerUser, loginUser, logoutUser, updateProfile, updatePassword, loadAuthData } = authSlice.actions;

export default authSlice.reducer;
