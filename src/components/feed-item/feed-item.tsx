import React from "react";
import style from "./feed-item.module.css";
import { getData, getStatusOrder } from '../../utils/constants';
import { ingredientsSelector } from '../../services/slices/ingredients-slice';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../services';
import { nanoid } from "@reduxjs/toolkit";
import { FC } from "react";
import { TOrder, TIngredient, TLocation } from "../../utils/types";

interface IFeedItem {
   feed: TOrder
}

const FeedItem: FC<IFeedItem> = ({feed}) => {
   const { ingredients } = useAppSelector(ingredientsSelector)
   const location = useLocation<TLocation>()

   let ingrFeed: TIngredient[] = []

   feed.ingredients.forEach(item => {
      if (item !== null)
      ingrFeed.push(ingredients.find((el: TIngredient) => el._id === item));
   });

   const finalTotal: number = React.useMemo(
      () => ingrFeed.length !== 0 ? ingrFeed.reduce((sum: number, item: TIngredient) => sum + item.price, 0) : 0, [ingrFeed]
   ) 

   let ingrs: TIngredient[] = ingrFeed.length > 5 ? ingrFeed.slice(0, 5).reverse() : ingrFeed
   let lastIngrs: TIngredient[] = ingrFeed.slice(5, 6).reverse()
   let countLotsOfIngrs: number = ingrFeed.slice(5).length

   return (
      <Link to={{ pathname: `${location.pathname}/${feed._id}`, state: { background: location } }} className={`${style.feed} p-6 mb-4 mr-2`}>
         <div className={`${style.cont_info}`}>
            <p className='text text_type_digits-default'>#{feed.number}</p>
            <time className='text text_type_main-small text_color_inactive'>{getData(feed.createdAt)}</time>
         </div>
         <h2 className='text text_type_main-large mt-6'>{feed.name}</h2>
         {location.pathname.startsWith("/profile") && (
            <span className={`text text_type_main-small mt-2 ${feed.status === "done" ? style.done : "text_color_primary"}`}>
               {getStatusOrder(feed.status)}
            </span>
         )}
         <div className={`${style.order_cont} mt-6`}>
            <div className={style.images}>
               {lastIngrs.length !== 0 &&
                  <div className={style.count}>
                     <p className={`${style.count_c} text text_type_main-small `}>+{countLotsOfIngrs}</p>
                     <img className={style.order_image_all} src={lastIngrs[0].image_mobile} alt={lastIngrs[0].name} />
                  </div>
               }
               {ingrs && ingrs.map((i: TIngredient) => {
                  return <img className={style.order_image} src={i.image_mobile} alt='1' key={nanoid()} />
               })}
            </div>
            <div className={style.resalt}>
               <CurrencyIcon type='primary' />
               <p className='text text_type_digits-default ml-2'>{finalTotal}</p>
            </div>
         </div>
      </Link>
   )
}

export default FeedItem