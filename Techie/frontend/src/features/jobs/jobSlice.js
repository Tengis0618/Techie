import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import jobService from './jobService';

const initialState = {
  jobs: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new job
export const createJob = createAsyncThunk(
  'jobs/create',
  async (jobData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await jobService.createJob(jobData, token);
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
)

export const getAppliedJobs = createAsyncThunk(
  'jobs/appliedjobs',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await jobService.getAppliedJobs(token);
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
)

export const getJobs = createAsyncThunk(
  'jobs/getJobs',
  async(_, thunkAPI) => {
    try {
      return await jobService.getJobs();
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
)

export const myJobs = createAsyncThunk(
  'jobs/myJobs',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await jobService.myJobs(token);
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
)


export const deleteJob = createAsyncThunk(
  'jobs/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await jobService.deleteJob(id, token)
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
)

export const applyJob = createAsyncThunk(
  'jobs/apply',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await jobService.applyJob(id, token)
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
)

export const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createJob.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        //state.jobs.insert(0, action.payload)
        state.jobs = action.payload
      })
      .addCase(createJob.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(myJobs.pending, (state) => {
        state.isLoading = true
      })
      .addCase(myJobs.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.jobs = action.payload
      })
      .addCase(myJobs.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getAppliedJobs.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAppliedJobs.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.jobs = action.payload
      })
      .addCase(getAppliedJobs.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getJobs.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getJobs.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.jobs = action.payload
      })
      .addCase(getJobs.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteJob.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteJob.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.jobs = state.jobs.filter(
          (job) => job._id !== action.payload.id
        )
      })
      .addCase(applyJob.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(applyJob.pending, (state) => {
        state.isLoading = true
      })
      .addCase(applyJob.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.jobs = state.jobs.filter(
          (job) => job._id !== action.payload.id
        )
      })
  },
})

export const { reset } = jobSlice.actions
export default jobSlice.reducer