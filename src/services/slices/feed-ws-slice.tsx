import { createSlice } from "@reduxjs/toolkit";
import { TOrder } from '../../utils/types';
import { TRootState } from '../index'

type TInitialState = {
   webSocket: null | WebSocket ,
   isConnected: boolean,
   hasError: boolean,
   feed: TOrder[],
   total: null | number,
   totalToday: null | number,
}

const initialState = {
   webSocket: null,
   isConnected: false,
   hasError: false,
   feed: [],
   total: null,
   totalToday: null,
} as TInitialState

export const feedWsSlice = createSlice({
   name: "webSocket",
   initialState,
   reducers: {
      // @ts-ignore
      wsStart: (state, { payload }) => { },

      wsSuccess: (state) => {
         state.isConnected = true;
         state.hasError = false;
      },
      wsError: (state) => {
         state.isConnected = false;
         state.hasError = true;
      },
      wsClose: (state) => {
         state.isConnected = false;
         state.hasError = false;
      },
      saveData: (state, { payload }) => {
         state.feed = payload.orders;
         state.total = payload.total;
         state.totalToday = payload.totalToday;
      },
   },
});

export const { wsStart, wsSuccess, wsError, wsClose, saveData } = feedWsSlice.actions;
export const wsActions = feedWsSlice.actions;
export const wsSelector = (state: TRootState) => state.webSocket;
export const wsReducer = feedWsSlice.reducer;