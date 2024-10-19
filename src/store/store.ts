import {configureStore} from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from "redux-persist/lib/storage/session";
import editorReducer, {EditorState} from "./editorReducer.ts";

const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer<EditorState>(persistConfig, editorReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),

});

export const persistor = persistStore(store);

export type appState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
