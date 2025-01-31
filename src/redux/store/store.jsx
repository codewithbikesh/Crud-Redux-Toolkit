import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducers/userReducer'; // Your reducer
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // For localStorage persistence

// Persist config
const persistConfig = {
  key: 'root',
  storage,
};

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, userReducer);

// Configure store
const store = configureStore({
  reducer: {
    user: persistedReducer, // Using persisted reducer for user state
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'], // Ignore persist actions for non-serializable values
      },
    }),
});

// Create persistor
const persistor = persistStore(store);

export { store, persistor }; // Export both store and persistor
