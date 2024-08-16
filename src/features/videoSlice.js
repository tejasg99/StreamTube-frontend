import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    video: null,
    videoForEditing: null
}

const videoSlice = createSlice({
    name: "video",
    initialState,
    reducers: {
        setVideo: (state, action) => {
            state.video = action.payload
        },
        setVideoForEditing: (state, action) => {
            state.videoForEditing = action.payload
        }
    }
})

export const { setVideo, setVideoForEditing} = videoSlice.actions;
export default videoSlice.reducer;