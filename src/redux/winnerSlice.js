import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";

export const fetchWinners = createAsyncThunk("winner/fetchWinners", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get("/api/winners", { withCredentials: true });
    return response.data.winners;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch winners");
  }
});

const winnerSlice = createSlice({
  name: "winner",
  initialState: { winners: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWinners.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchWinners.fulfilled, (state, action) => { state.loading = false; state.winners = action.payload; })
      .addCase(fetchWinners.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export default winnerSlice.reducer;
