import {configureStore} from "@reduxjs/toolkit";
import {undoableReducer, initialUndoableState, UndoableState, EditorState} from "./editorReducer.ts";

const saveState = (state: EditorState) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('editorPresentState', serializedState);
    } catch (err) {
        console.error("Ошибка при сохранении состояния в localStorage", err);
    }
};
const loadState = (): EditorState | undefined => {
    try {
        const serializedState = localStorage.getItem('editorPresentState');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState) as EditorState;
    } catch (err) {
        console.error("Ошибка при загрузке состояния из localStorage", err);
        return undefined;
    }
};

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
