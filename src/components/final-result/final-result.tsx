import React, { useState, useContext, useEffect } from 'react';
import style from './final-result.module.css';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientContext } from '../../services/ingredient-context';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { API_BURGERS } from '../../utils/api'

const FinalResult = () => {

   const { ingredients } = useContext(IngredientContext);
   const [ingredient, setIngredient] = useState(false);

   //const [orderName, setOrderName] = useState('')
   const [orederNumber, setOrederNumber] = useState(0)
   const togglePopup = () => {
      setIngredient(!ingredient)
   }

   const resCheck = (res) => {
      if (res.ok) {
         return res.json();
      } else {
         return Promise.reject(`Что-то пошло не так( Ошибка: ${res.status}`)
      }
   }

   useEffect(() => {
      const postOrder = () => {
         return fetch(API_BURGERS+`${'orders'}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ingredients: ingredients.map(ingr => ingr._id) })
         })
            .then(resCheck)
            .then(res => {
               //setOrderName(res.name);
               setOrederNumber(res.order.number)
            })
            .catch(err => {
               //setOrderName('');
               setOrederNumber(0);
               console.error(err.message)
            })
      }
      postOrder()
   }, [])

   const finalTotal = React.useMemo(
      () => {
         const total = ingredients.filter(ingr => ingr.type !== 'bun').reduce((sum, it) => sum + it.price, 0);
         const totalBun = ingredients.filter(ingr => ingr.type === 'bun')[0].price * 2;
         return total + totalBun;
      },
      [ingredients]
   )

   return (
      <>
      <div className={`${style.container} mr-8`}>
         <div className={`${style.total} mr-10`}>
            <span className={'text text_type_digits-medium mr-2'}>{finalTotal}</span>
            <CurrencyIcon type='primary'/>
         </div>
         <Button onClick={togglePopup} type="primary" size="medium">Оформить заказ</Button>
      </div>

      {
         ingredient && orederNumber &&
         <Modal onToggle={togglePopup}>
            <OrderDetails number={orederNumber} />
         </Modal>
      }
      </>
   )
}



export default FinalResult