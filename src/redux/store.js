import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import localforage from "localforage";
import { REDUX_KEYS } from "@/_helpers/constants";
import productReducer from "./slices/product";
import globalReducer from "./slices/global.slice";
import kanbanReducer from "./slices/kanban.slice";

export const reducers = combineReducers({
  [REDUX_KEYS.PRODUCTS]: productReducer,
  [REDUX_KEYS.GLOBAL]: globalReducer,
  [REDUX_KEYS.KANBAN]: kanbanReducer,
});

// Persist config: persist only the kanban slice using IndexedDB (localForage)
const persistConfig = {
  key: "root",
  storage: localforage,
  whitelist: [REDUX_KEYS.KANBAN],
};

const persistedReducer = persistReducer(persistConfig, reducers);

/* ------------- Store ------------- */
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== "production",
});

const persistor = persistStore(store);

export { store as default, persistor };
