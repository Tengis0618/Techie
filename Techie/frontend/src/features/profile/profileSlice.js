import profileService from "./profileService";
import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const getProfile = createAsyncThunk(
  'profile/getProfile',
  async (_, thunkAPI) => {
    try {
    const token = thunkAPI.getState().auth.user.token;
    return await profileService.getProfile(token);
    } catch (error){
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
);

export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async (userData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await profileService.updateProfile(userData, token);
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    }
);

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user: null,
    profiles: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: null,
  };
  
  export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
      reset: (state) => initialState,
    },
    extraReducers: (builder) => {
      builder
        .addCase(getProfile.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getProfile.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.profiles = action.payload;
        })
        .addCase(getProfile.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
        .addCase(updateProfile.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(updateProfile.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.profiles = action.payload;
        })
        .addCase(updateProfile.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        });
    },
  });
  
  export const { reset } = profileSlice.actions;
  
  export default profileSlice.reducer;