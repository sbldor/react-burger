import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit';
import { ingredientsReducer } from './slices/ingredients-slice'
import { authReducer } from './slices/auth-slice'
import { wsReducer } from "./slices/feed-ws-slice";
import { wsMiddleware } from "./middlewares/websocket";
import { wsActions } from "./slices/feed-ws-slice";
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'

const rootReducer = combineReducers({
   ingredients: ingredientsReducer,
   auth: authReducer,
   webSocket: wsReducer
})

export const store = configureStore({
   reducer: rootReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(wsMiddleware(wsActions)),
   devTools: process.env.NODE_ENV !== "production",
})

export type TRootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector

