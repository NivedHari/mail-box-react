import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth-slice';
import uiReducer from './ui-slice';
import emailReducer from './email-slice';

const store = configureStore({
    reducer:{auth: authReducer, ui: uiReducer, email: emailReducer}
})

export default store;