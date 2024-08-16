import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/authSlice";
import channelSlice from "../features/channelSlice";
import videoSlice from "../features/videoSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        channel: channelSlice,
        video: videoSlice,
    }
})

export default store;