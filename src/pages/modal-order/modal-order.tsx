import style from "./modal-order.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../services";
import { wsUrl } from "../../utils/api";
import FeedDetals from '../../components/feed-detals/feed-detals'
import { wsClose, wsStart } from "../../services/slices/feed-ws-slice";
import { wsSelector } from "../../services/slices/feed-ws-slice";
import { getCookie } from "../../utils/cookies";
import { FC } from "react";
import { TOrder } from "../../utils/types";

interface IModalOrder {
   status: string
}

const ModalOrder: FC<IModalOrder> = ({status}) => {

   const { feed } = useAppSelector(wsSelector);
   const dispatch = useAppDispatch();
   const { id } = useParams<{id:string}>();
   const [activeOrder, setActiveOrder] = useState<TOrder>(null);
   const profileToken = getCookie("accessToken").slice(7);

   useEffect(() => {
      if (feed.length === 0 && status === 'orders') {
         dispatch(wsStart({ url: `${wsUrl}/all` }));
         return () => {
            dispatch(wsClose());
         };
      }
      if (feed.length === 0 && status === 'profile') {
         dispatch(wsStart({ url: `${wsUrl}`, token: profileToken }));
         return () => {
            dispatch(wsClose());
         };
      }

      const currentOrder: TOrder = feed.find((el: TOrder) => el._id === id);
      if (currentOrder) setActiveOrder(currentOrder);
   }, [feed]);

   return (
      <div className={style.cont}>
         {feed.length > 0 && activeOrder && <FeedDetals />}
      </div>
   );
};

export default ModalOrder

