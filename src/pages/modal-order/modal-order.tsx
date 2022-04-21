import style from "./modal-order.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { wsUrl } from "../../utils/api";
import FeedDetals from '../../components/feed-detals/feed-detals'
import { wsClose, wsStart } from "../../services/slices/feed-ws-slice";
import { wsSelector } from "../../services/slices/feed-ws-slice";

const ModalOrder = () => {
   const { feed } = useSelector(wsSelector);
   const dispatch = useDispatch();
   const { id } = useParams();
   const [activeOrder, setActiveOrder] = useState([]);

   useEffect(() => {
      if (feed.length === 0) {
         dispatch(wsStart({ url: `${wsUrl}/all` }));
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

