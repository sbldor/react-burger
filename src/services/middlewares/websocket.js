export const wsMiddleware = (wsActions) => {
   return (store) => {

      let socket = null;

      return (next) => (action) => {
         const { dispatch } = store;
         const { type, payload } = action;
         const { wsStart, wsSuccess, wsError, wsClose, saveData } =
            wsActions;

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