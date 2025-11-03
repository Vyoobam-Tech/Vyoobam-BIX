import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axiosInstance";

const API_URL = "/taxes";

export const fetchtaxes = createAsyncThunk("taxes/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const res = await API.get(API_URL);
    return res.data;
  } catch (error) {
    console.error("Fetch taxes error:", error.response?.data || error.message);
    return rejectWithValue(error.response?.data || error.message);
  }
});


export const addtax = createAsyncThunk("taxes/add", async (tax, { rejectWithValue }) => {
  try {
    const res = await API.post(API_URL, tax);
    return res.data;
  } catch (error) {
    console.error("Add tax error:", error.response?.data || error.message);
    return rejectWithValue(error.response?.data || error.message);
  }
});


export const deletetax = createAsyncThunk("taxes/delete", async (id, { rejectWithValue }) => {
  try {
    await API.delete(`${API_URL}/${id}`);
    return id;
  } catch (error) {
    console.error("Delete tax error:", error.response?.data || error.message);
    return rejectWithValue(error.response?.data || error.message);
  }
});


export const updatetax = createAsyncThunk("taxes/update", async ({ id, updatedData }, { rejectWithValue }) => {
  try {
    const res = await API.put(`${API_URL}/${id}`, updatedData);
    return res.data;
  } catch (error) {
    console.error("Update tax error:", error.response?.data || error.message);
    return rejectWithValue(error.response?.data || error.message);
  }
});


const taxSlice = createSlice({
  name: "taxes",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
   
      .addCase(fetchtaxes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchtaxes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchtaxes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })

      
      .addCase(addtax.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

   
      .addCase(deletetax.fulfilled, (state, action) => {
        state.items = state.items.filter((t) => t._id !== action.payload);
      })


      .addCase(updatetax.fulfilled, (state, action) => {
        const index = state.items.findIndex((t) => t._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
  },
});

export default taxSlice.reducer;
