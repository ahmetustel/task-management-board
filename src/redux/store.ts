// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import tasksReducer from './tasksSlice';
import usersReducer from './usersSlice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    users: usersReducer,
  },
});

// TypeScript için root state ve dispatch tiplerini çıkarıyoruz
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hooklar
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
