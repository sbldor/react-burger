import React from "react";
import style from "./feed-item.module.css";
import { getData, getStatusOrder } from '../../utils/constants';
import { ingredientsSelector } from '../../services/slices/ingredients-slice';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from "prop-types";
import { useSelector } from 'react-redux';
import { nanoid } from "@reduxjs/toolkit";

const FeedItem = ({feed}) => {
   const { ingredients } = useSelector(ingredientsSelector)
   const location = useLocation()

   let ingrFeed = []

   feed.ingredients.forEach(item => {
      ingrFeed.push(ingredients.find((el) => el._id === item));
   });

   const finalTotal = React.useMemo(
      () => {
         const total = ingrFeed.filter(ingr => ingr.type !== 'bun').reduce((sum, it) => sum + it.price, 0);
         const totalBun = ingrFeed.some(ingr => ingr.type === 'bun') ? ingrFeed.find(ingr => ingr.type === 'bun').price : 0
         return total + totalBun;
      },
      [ingrFeed]
   )

   console.log(feed)

   let ingrs = ingrFeed.slice(0, 5).reverse()
   let lastIngrs = ingrFeed.slice(5, 6).reverse()
   let countLotsOfIngrs = ingrFeed.slice(5).length
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
               {ingrs && ingrs.map((i) => {
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

FeedItem.propTypes = {
   feed: PropTypes.object.isRequired,
};

export default FeedItem