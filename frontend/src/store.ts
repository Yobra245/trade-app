import { configureStore, createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: { isAuthenticated: false },
    reducers: {
        login: state => { state.isAuthenticated = true; },
        logout: state => { state.isAuthenticated = false; }
    }
});

export const { login, logout } = userSlice.actions;

const store = configureStore({
    reducer: {
        user: userSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;