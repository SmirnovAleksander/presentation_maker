import {configureStore} from "@reduxjs/toolkit";
import {initialUndoableState, undoableReducer, UndoableState} from "./reducers/undoableReducer.ts";
import { loadState, saveState } from "./utils/localStorage.ts";

const persistedPresentState = loadState();
const persistedState: UndoableState = persistedPresentState
    ? {
        past: [],
        present: persistedPresentState,
        future: []
    }
    : initialUndoableState;

const store = configureStore({
    reducer: undoableReducer,
    preloadedState: persistedState,
});
store.subscribe(() => {
    saveState(store.getState().present);
});

export type appState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
