import { createSlice,createAsyncThunk,  } from "@reduxjs/toolkit";
import axios from "axios";


const API_URL = "http://localhost:5000/api/expenses"

export const fetchexpenses = createAsyncThunk("expenses/fetchAll",async () => {
    const res=await axios.get(API_URL)
    return res.data
})

export const addexpense=createAsyncThunk("expenses/add",async (expense) => {
    const res = await axios.post(API_URL,expense)
    return res.data
})

export const deleteexpense=createAsyncThunk("expenses/delete",async (id) => {
    await axios.delete(`${API_URL}/${id}`)
    return id
})

const expenseSlice=createSlice({
    name:"expenses",
    initialState:{
        items:[],
        status:"idle",
        error:null,
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchexpenses.pending,(state)=>{
            state.status="loading"
        })
        .addCase(fetchexpenses.fulfilled,(state,action)=>{
            state.status="succeeded"
            state.items=action.payload
        })
        .addCase(fetchexpenses.rejected,(state,action)=>{
            state.status="failed"
            state.error=action.error.message
    })
    .addCase(addexpense.fulfilled,(state,action)=>{
        state.items.push(action.payload)
    })
    .addCase(deleteexpense.fulfilled,(state,action)=>{
        state.items=state.items.filter((c)=>c._id !== action.payload)
    })
    }
        
})

export default expenseSlice.reducer