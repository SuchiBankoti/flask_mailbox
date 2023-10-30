import { configureStore } from "@reduxjs/toolkit";
import mailboxReducer from "./CreateSlice"

export const store = configureStore({
    reducer: {
        mailbox:mailboxReducer
    }
})

