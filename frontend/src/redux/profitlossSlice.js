import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import API from "../api/axiosInstance";

const API_URL="/reports/profitloss"

export const fetchProfitLoss=createAsyncThunk("profitloss/fetchAll",async(filters,{rejectWithValue}) => {
    try {
      const query=new URLSearchParams({
        fromDate:filters.from_date,
        toDate:filters.to_date,
        warehouseId:filters.warehouse_id,
      });
      const res = await API.get(`${API_URL}?${query}`);
      return res.data
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const profitlossSlice=createSlice({
    name:"profitloss",
    initialState:{
        report:null,
        status:"idle",
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
       builder
       .addCase(fetchProfitLoss.pending,(state)=>{
        state.status="loading"
       })
       .addCase(fetchProfitLoss.fulfilled,(state,action)=>{
        state.status="succeeded"
        state.report=action.payload
       })
       .addCase(fetchProfitLoss.rejected,(state,action)=>{
        state.status="failed"
        state.error=action.error.message
       })
       
    }

})

export default profitlossSlice.reducer