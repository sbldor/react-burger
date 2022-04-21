import style from './feed-detals.module.css'
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from 'react-redux';
import { ingredientsSelector } from '../../services/slices/ingredients-slice';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState } from "react";
import { wsSelector } from "../../services/slices/feed-ws-slice";
import { useParams } from "react-router-dom";
import { getStatusOrder, getData } from '../../utils/constants'
import { fetchIngredients } from '../../services/slices/ingredients-slice';


const FeedDetals = () => {

   const dispatch = useDispatch()
   const { ingredients } = useSelector(ingredientsSelector)
   const { feed } = useSelector(wsSelector);
   const { id } = useParams();
   const [data, setData] = useState(null);
   const [orderPrice, setPrice] = useState(0);
   const [orderIngredients, setIngredients] = useState([]);

   useEffect(() => {
      if (ingredients === null) dispatch(fetchIngredients());
   }, [ingredients, feed]);

   useEffect(() => {
      const activeOrder = feed.find((item) => item._id === id);
      if (!data && ingredients && activeOrder) {
         setData(activeOrder);
         let ingredientsArray = [];

         activeOrder.ingredients.forEach((element) => {
            let ingr = ingredients.find((item) => item._id === element);
            if (ingr) {
               ingredientsArray.push({ ...ingr, count: 1 });
            }
            const price = ingredientsArray.reduce(
               (total, curValue) => total + curValue.price,
               0
            );
            setPrice(price);
         });

         const ingredientsCounted = [];
         ingredientsArray.forEach((element) => {
            const ingr = ingredientsCounted.find((i) => i._id === element._id);
            if (ingr) {
               if (ingr.count) ingr.count += 1;
            } else {
               ingredientsCounted.push(element);
            }
         });

         setIngredients(ingredientsCounted);
      }
   }, [ingredients, feed]);
   

   return (
      <>
      {data && (
      <div className={style.main}>
         <h2 className='text text_type_digits-default mt-4 mb-2' style={{ textAlign: 'left' }} >#{data.number}</h2>
         <h2 className='text text_type_main-medium mb-3 mt-8' style={{ textAlign: 'left' }}>{data.name}</h2>
         <p className={`text text_type_main-default mb-15 ${data.status === "done" ? style.done : "text_color_primary"}`} style={{ textAlign: 'left' }}>{getStatusOrder(data.status)}</p>
         <p className='text text_type_main-medium mb-6' style={{ textAlign: 'left' }}>Состав:</p>
         <ul className={`${style.ingredients} mb-10 pr-6 custom-scroll`}>
            {orderIngredients && orderIngredients.map(ingr => (
               <li key={nanoid()} className={style.ingredient}>
                  <div className={style.cont}>
                     <img className={`${style.icon} mr-4`} src={ingr.image_mobile} alt='картинка' />
                     <span className={`text text_type_main-default`}>{ingr.name}</span>
                  </div>
                  <div className={style.cont}>
                     <span className={'text text_type_digits-default'}>{ingr.count}</span>
                     <span className={'text text_type_main-default mr-2 ml-2'}>x</span>
                     <span className={'text text_type_digits-default mr-2'}>{ingr.price}</span>
                     <CurrencyIcon type='primary' />
                  </div>
               </li>
            ))}
         </ul>
         <div className={style.info}>
            <p className={'text text_type_main-default text_color_inactive'}>{getData(data.createdAt)}</p>
            <div className={style.cont}>
               <span className={'text text_type_digits-default mr-2'}>{orderPrice}</span>
               <CurrencyIcon type='primary' />
            </div>
         </div>
      </div>
      )}
      </>
      
   )
}

export default FeedDetals