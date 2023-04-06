import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
//employee login
export const userLogin=createAsyncThunk('/login',async(userCred,{rejectWithValue})=>{
    //get token,empObj from backend
    try{
        let response=await axios.post("http://localhost:4000/employee-login",userCred)
        console.log(response)
        if(response.data.message==='success'){
        //store token in session storage
        sessionStorage.setItem('token',response.data.token)
        sessionStorage.setItem('status','success')
        sessionStorage.setItem('employee',JSON.stringify(response.data.employee))
        return response.data;
        }
        else{
            throw new Error(response.data.message)
        }
        
    } catch(err){
        return rejectWithValue(err);
    }
    
})
let employee=sessionStorage.getItem("employee")
if(employee){
    employee=JSON.parse(employee)
}
else{
    employee={}
}
let status=sessionStorage.getItem("status")
if(!status){
    status='idle'
}
export const loginSlice=createSlice({
    name:"login",
    initialState:{
        employee:employee,
        errorMessage:'',
        status:status
    },
    reducers:{
        clearState:(state)=>{
            state.employee={};
            state.errorMessage="";
            state.status='idle'
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(userLogin.pending,(state,action)=>{
            state.status="pending"
        });
        builder.addCase(userLogin.fulfilled,(state,action)=>{
            console.log("fulfilled",action)
            state.employee=action.payload.employee;
            state.errorMessage="";
            state.status="success";
        });
        builder.addCase(userLogin.rejected,(state,action)=>{
            state.errorMessage = action.payload.message;
            state.status = "failed";
        })
    }
})

//export reducer functions
export const {clearState}=loginSlice.actions;

//export reducer
export default loginSlice.reducer;