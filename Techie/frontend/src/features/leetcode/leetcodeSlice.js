import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  leetcode: null,
  loading: 'idle',
  error: null,
}

export const getLeetcode = createAsyncThunk(
  'userData/fetchUserData',
  async (username, thunkAPI) => {
    try {
      const response = await axios.get(`https://leetcode-api-faisalshohag.vercel.app/${username}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const leetcodeSlice = createSlice({
  name: 'leetcode',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLeetcode.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(getLeetcode.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.leetcode = action.payload;
      })
      .addCase(getLeetcode.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.payload;
      });
  },
});
export const {reset} = leetcodeSlice.actions
export default leetcodeSlice.reducer;
