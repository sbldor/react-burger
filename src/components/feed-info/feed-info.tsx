import style from './feed-info.module.css';
import { nanoid } from "@reduxjs/toolkit";
import { useAppSelector } from "../../services";
import { wsSelector } from "../../services/slices/feed-ws-slice";
import { FC } from 'react';
import { TOrder } from '../../utils/types';

interface TFeedInfo {
   feed: Array<TOrder>
};

const FeedInfo: FC<TFeedInfo> = ({feed}) => {

   const { total, totalToday } = useAppSelector(wsSelector);
   let done = feed.filter((el) => el.status === "done");
   let pending = feed.filter((el) => el.status === "pending");

   return (
      <div className={style.container}>
         <div className={`${style.orders} mb-15 `}>
            <div className={`${style.cont_status}`}>
               <h2 className={`text text_type_main-medium mb-6 `}>Готовы:</h2>
               <div className={`${style.list} custom-scroll`}>
                  {feed &&
                     done.map(i => (
                        <p key={nanoid()} className={`${style.ready} text text_type_digits-default`}>{i.number}</p>
                     ))
                  }
               </div>
            </div>
         
            <div className={style.cont_status}>
               <h2 className={`text text_type_main-medium mb-6 `}>В работе:</h2>
               <div className={`${style.list} custom-scroll`}>
                  {feed &&
                     pending.map(i => (
                        <p key={nanoid()} className={`${style.job} text text_type_digits-default`}>{i.number}</p>
                     ))
                  }
               </div>
            </div>
         </div>
         <p className={`text text_type_main-medium`}>Выполнено за все время:</p>
         <p className={`text text_type_digits-large mb-15 ${style.count}`}>{total}</p>
         <p className={`text text_type_main-medium`}>Выполнено за сегодня:</p>
         <p className={`text text_type_digits-large ${style.count}`}>{totalToday}</p>
      </div>
   )
}

export default FeedInfo