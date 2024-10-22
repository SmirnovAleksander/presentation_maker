import {configureStore} from "@reduxjs/toolkit";
import {undoableReducer} from "./editorReducer.ts";

const store = configureStore({
    reducer: undoableReducer
});

export type appState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;