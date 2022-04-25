import style from "./modal-order.module.css";
import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { wsUrl } from "../../utils/api";
import FeedDetals from '../../components/feed-detals/feed-detals'
import { wsClose, wsStart } from "../../services/slices/feed-ws-slice";
import { wsSelector } from "../../services/slices/feed-ws-slice";
import { getCookie } from "../../utils/cookies";

const ModalOrder = ({status}) => {

   const { feed } = useSelector(wsSelector);
   const dispatch = useDispatch();
   const { id } = useParams();
   const [activeOrder, setActiveOrder] = useState([]);
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

      const currentOrder = feed.find((el) => el._id === id);
      if (currentOrder) setActiveOrder(currentOrder);
   }, [feed]);

   return (
      <div className={style.cont}>
         {feed.length > 0 && activeOrder && <FeedDetals />}
      </div>
   );
};

export default ModalOrder

