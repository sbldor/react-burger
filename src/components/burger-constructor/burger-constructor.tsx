import { useState, useContext, useEffect } from 'react';
import style from './burger-constructor.module.css';
import PropTypes from 'prop-types';
import ingredients from "../../utils/prop-types";
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import FinalResult from "../final-result/final-result";
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { IngredienttContext } from '../../services/ingredient-context';



const BurgerConstructor = () => {
   const { ingredients } = useContext(IngredienttContext)

   const [ingredient, setIngredient] = useState(false)
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

   const middleIngredients = ingredients.filter(ingr => ingr.type !== 'bun');
   const bun = ingredients.filter(ingr => ingr.type === 'bun');
   const API_ORDERS = 'https://norma.nomoreparties.space/api/orders'
   useEffect(() => {
      const postOrder = (api) => {
         return fetch(api, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ingredients: ingredients.map(ingr => ingr._id)})
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
      postOrder(API_ORDERS)
   }, [])

   return (
      <section className={`${style.constructor} mt-25`}>

         {ingredient && orederNumber &&
            <Modal onToggle={togglePopup}>
               <OrderDetails number={orederNumber} />
            </Modal>
         }

         <div className={`${style.bun} ml-14 pb-4`}>
            <ConstructorElement
               type='top'
               isLocked={true}
               text={bun[0].name + '(верх)'}
               price={bun[0].price}
               thumbnail={bun[0].image}
            />
         </div>

         <ul className={`${style.middle} custom-scroll mb-4 mt-4`}>
            {middleIngredients.map((ingr) => (
               <li className={`${style.ingredients} mr-3`} key={ingr._id}> 
                  <DragIcon type='primary'/>
                  <ConstructorElement
                     text={ingr.name}
                     price={ingr.price}
                     thumbnail={ingr.image}
                  />
               </li> 
               )
            )}
         </ul>

         <div className={`${style.bun} ml-14 mb-10 pt-4`}>
            <ConstructorElement
               type='bottom'
               isLocked={true}
               text={bun[0].name + '(низ)'}
               price={bun[0].price}
               thumbnail={bun[0].image}
            />
         </div>
         <FinalResult onToggle={togglePopup}>Оформить заказ</FinalResult>
      </section>
   )
}

// BurgerConstructor.propTypes ={
//    data: PropTypes.arrayOf(ingredients).isRequired
// }

export default BurgerConstructor