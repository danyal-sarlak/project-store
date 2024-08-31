import { configureStore } from "@reduxjs/toolkit";
import basket from './baketSlice'
export const store = configureStore({
    reducer:{
     basket
    }
})