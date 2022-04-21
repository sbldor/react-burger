import style from './profile-feed.module.css'
import { wsUrl } from "../../utils/api";
import { wsClose, wsStart } from "../../services/slices/feed-ws-slice";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCookie } from "../../utils/cookies";
import Loader from "../../components/loader/loader";
import { ingredientsSelector } from "../../services/slices/ingredients-slice";
import Orders from '../orders/orders';
import { wsSelector } from "../../services/slices/feed-ws-slice";

const ProfileOrders = () => {
   const dispatch = useDispatch();
   const { loading } = useSelector(ingredientsSelector);
   const profileToken = getCookie("accessToken").slice(7);
   const { feed } = useSelector(wsSelector);

   let reversedFeed = [];

   if (feed.length > 0) {
      reversedFeed = [...feed].reverse();
   }


   useEffect(() => {
      dispatch(wsStart({ url: `${wsUrl}`, token: profileToken }));
      return () => {
         dispatch(wsClose());
      };
   }, []);

   return (
      <>
         {loading && <Loader />}
         {!loading && (
            <section className={`${style.feed} custom-scroll `}>
               <Orders feed={reversedFeed} />
            </section>
         )}
      </>
   );
};

export default ProfileOrders