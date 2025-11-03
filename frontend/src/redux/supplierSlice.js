import { createSlice,createAsyncThunk,} from "@reduxjs/toolkit";
import API from "../api/axiosInstance";

const API_URL="/suppliers"

export const fetchsuppliers=createAsyncThunk("suppliers/fetchAll",async () => {

    const res = await API.get(API_URL)
    return res.data
})

export const addSupplier=createAsyncThunk("suppliers/add",async (supplier) => {
   
    const res = await API.post(API_URL,supplier)
    return res.data
})

export const deleteSupplier=createAsyncThunk("suppliers/delete",async (id) => {
    
    await API.delete(`${API_URL}/${id}`)
    return id
})

export const updateSupplier=createAsyncThunk("suppliers/update",async({id, updatedData})=>{
   
    const res = await API.put(`${API_URL}/${id}`,updatedData)
    return res.data
})

const supplierSlice=createSlice({
    name:"suppliers",
    initialState:{
        items:[],
    status:"idle",
error:null,
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchsuppliers.pending,(state)=>{
            state.status="loading"
        })
        .addCase(fetchsuppliers.fulfilled,(state,action)=>{
            state.status="succeeded"
            state.items=action.payload || action.payload.suppliers
        })
        .addCase(fetchsuppliers.rejected,(state,action)=>{
            state.status="failed"
            state.error=action.error.message
        })
        .addCase(addSupplier.fulfilled,(state,action)=>{
            state.items.push(action.payload)
        })
        .addCase(deleteSupplier.fulfilled,(state,action)=>{
            state.items=state.items.filter((s)=>s._id !== action.payload)
        })
        .addCase(updateSupplier.fulfilled,(state,action)=>{
            const index=state.items.findIndex((s)=>s._id === action.payload)
            if(index !== -1){
                state.items[index]=action.payload
            }
        })
    }
})

export default supplierSlice.reducer