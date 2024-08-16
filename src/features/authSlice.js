import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    authStatus: false
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
       setUser: (state, action) => {
        if(!action.payload){
            state.user = null,
            state.authStatus = false
        } else {
            state.user = action.payload,
            state.authStatus = true
        }
       } 
    }
})

export const { setUser } = authSlice.actions;

export default authSlice.reducer;