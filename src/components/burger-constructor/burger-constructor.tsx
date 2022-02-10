import { useState } from 'react';
import style from './burger-constructor.module.css';
import PropTypes from 'prop-types';
import ingredients from "../../utils/prop-types";
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import FinalResult from "../final-result/final-result";
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';


const BurgerConstructor = (props) => {

   const [ingredient, setIngredient] = useState(false)
   const togglePopup = () => {
      setIngredient(!ingredient)
   }
   const middleIngredients =  props.data.filter(ingr => ingr.type !== 'bun');
   const bun = props.data.filter(ingr => ingr.type === 'bun');

   return (
      <section className={`${style.constructor} mt-25`}>

         {ingredient && 
            <Modal onToggle={togglePopup}>
               <OrderDetails/>
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
         <FinalResult onToggle={togglePopup} data={props.data}>Оформить заказ</FinalResult>
      </section>
   )
}

BurgerConstructor.propTypes ={
   data: PropTypes.arrayOf(ingredients).isRequired
}

export default BurgerConstructor