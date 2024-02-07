import { createSlice } from "@reduxjs/toolkit";

const emailSlice = createSlice({
  name: "emailSlice",
  initialState: { inbox: [] },
  reducers: {
    setInbox(state,action) {
        state.inbox = action.payload.items;
    },
    markRead(state,action){
        const emailId = action.payload;
        const emailIndex = state.inbox.findIndex((email) => email.id === emailId);
        if (emailIndex !== -1) {
            state.inbox[emailIndex].isRead = true; 
        }
    },
    deleteMail(state,action){
        const key = action.payload.key;
        state.inbox = state.inbox.filter(mail => mail.key !== key);
    }
  },
});

export const emailActions = emailSlice.actions;

export default emailSlice.reducer;
