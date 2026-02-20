// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { loginUser, registerUser } from "./authAPI";

// // ✅ SAFE localStorage parsing
// const userFromStorage = localStorage.getItem("user");
// const tokenFromStorage = localStorage.getItem("token");

// const initialState = {
//   user:
//     userFromStorage && userFromStorage !== "undefined"
//       ? JSON.parse(userFromStorage)
//       : null,
//   token: tokenFromStorage || null,
//   isLoading: false,
//   isError: false,
//   error: "",
// };



import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "./authAPI";

// SAFE localStorage helpers
const getUserFromStorage = () => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch (err) {
    console.error("Invalid user in localStorage, clearing it");
    localStorage.removeItem("user");
    return null;
  }
};

const getTokenFromStorage = () => {
  const token = localStorage.getItem("token");
  return token && token !== "undefined" ? token : null;
};

// Initial state
const initialState = {
  user: getUserFromStorage(),
  token: getTokenFromStorage(),
  isLoading: false,
  isError: false,
  error: "",
};

// ================== ASYNC THUNKS ==================

export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      return await registerUser(userData);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      return await loginUser(userData);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoading = false;
      state.isError = false;
      state.error = "";

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder

      // REGISTER
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;

        const payloadUser =
          action.payload.user ?? {
            _id: action.payload._id,
            name: action.payload.name,
            email: action.payload.email,
          };

        state.user = payloadUser;
        state.token = action.payload.token;

        localStorage.setItem("token", state.token);
        localStorage.setItem("user", JSON.stringify(payloadUser));
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      })

      // LOGIN
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;

        const payloadUser =
          action.payload.user ?? {
            _id: action.payload._id,
            name: action.payload.name,
            email: action.payload.email,
          };

        state.user = payloadUser;
        state.token = action.payload.token;

        localStorage.setItem("token", state.token);
        localStorage.setItem("user", JSON.stringify(payloadUser));
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
