// src/redux/usersSlice.ts

import { createSlice } from '@reduxjs/toolkit';
import { IUser } from '../interfaces/types';

interface UsersState {
  data: IUser[];
}

const initialState: UsersState = {
  data: [
    { id: 1, name: 'Ahmet', avatarUrl: '/images/avatar1.png' },
    { id: 2, name: 'Mehmet', avatarUrl: '/images/avatar2.png' },
  ],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
});

export const selectUsers = (state: { users: UsersState }) => state.users.data;

export default usersSlice.reducer;
