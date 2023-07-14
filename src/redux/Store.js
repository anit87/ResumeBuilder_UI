import rootReducer from "./reducer/rootReducer";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

const store = configureStore({
    reducer:rootReducer,
    Middleware:[thunk],
})

export default store;