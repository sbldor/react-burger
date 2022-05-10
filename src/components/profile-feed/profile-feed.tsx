import style from './profile-feed.module.css'
import { wsUrl } from "../../utils/api";
import { wsClose, wsStart } from "../../services/slices/feed-ws-slice";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../services";
import { getCookie } from "../../utils/cookies";
import Loader from "../../components/loader/loader";
import Orders from '../orders/orders';
import { wsSelector } from "../../services/slices/feed-ws-slice";
import { FC } from 'react';
import { TOrder } from '../../utils/types';

const ProfileOrders: FC = () => {
   const dispatch = useAppDispatch();
   const profileToken = getCookie("accessToken").slice(7);
   const { feed } = useAppSelector(wsSelector);

   let reversedFeed: TOrder[] = [];

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
         {reversedFeed.length === 0 && <Loader />}
         {reversedFeed.length !== 0 && (
            <section className={`${style.feed} custom-scroll `}>
               <Orders feed={reversedFeed} />
            </section>
         )}
      </>
   );
};

export default ProfileOrders