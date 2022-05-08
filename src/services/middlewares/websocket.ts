import { wsActions } from '../slices/feed-ws-slice';
import { AnyAction } from 'redux'

export const wsMiddleware = (Actions: typeof wsActions) => {
   return (store: { dispatch: any}) => {

      let socket: null | WebSocket = null;

      return (next: (actions: AnyAction) => void) => (action: AnyAction) => {
         const { dispatch } = store;
         const { type, payload } = action;
         const { wsStart, wsSuccess, wsError, wsClose, saveData } = Actions;

         if (type === wsStart.type) {
            const wsUrl = payload.token
               ? `${payload.url}?token=${payload.token}`
               : `${payload.url}`;
            socket = new WebSocket(wsUrl);
         }

         if (socket) {
            socket.onopen = () => {
               console.log("Connection established");
               dispatch(wsSuccess());
            };

            socket.onmessage = (event) => {
               const { data } = event;
               const { success, ...parsedData } = JSON.parse(data);
               if (success) {
                  dispatch(saveData(parsedData));
               }
            };

            socket.onerror = () => {
               dispatch(wsError());
            };

            socket.onclose = () => {
               dispatch(wsClose());
            };
         }

         next(action);
      };
   };
};