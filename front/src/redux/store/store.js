import { configureStore, combineReducers, getDefaultMiddleware } from "@reduxjs/toolkit";

import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { ListSlice } from "../reducer/categoryList";
import { UserSlice } from "../reducer/userSlice";

const persistConfig = {
    key: "root",
    version: 0,
    storage
};

const rootReducer = combineReducers({
    listReducer: ListSlice.reducer,
    userReducer: UserSlice.reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: {
        persistedReducer
    },
    middleware: getDefaultMiddleware({
        serializableCheck: {
            ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
    })
});

export const persistor = persistStore(store);

export default store;
