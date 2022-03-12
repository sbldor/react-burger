import React from 'react';
import style from './final-result.module.css';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { useDispatch, useSelector } from 'react-redux';
import { postFinalResult, closeOrderModal, ingredientsSelector } from '../../services/slices/ingredients-slice'

const FinalResult = () => {

   const { order, orderModal, constructorIngredients } = useSelector(ingredientsSelector)
   const dispatch = useDispatch()

   const finalTotal = React.useMemo(
      () => {
         const total = constructorIngredients.filter(ingr => ingr.type !== 'bun').reduce((sum, it) => sum + it.price, 0);
         const totalBun = constructorIngredients.some(ingr => ingr.type === 'bun') ? constructorIngredients.find(ingr => ingr.type === 'bun').price : 0
         return total + totalBun;
      },
      [constructorIngredients]
   )

   return (
      <>
      <div className={`${style.container} mr-8`}>
         <div className={`${style.total} mr-10`}>
            <span className={'text text_type_digits-medium mr-2'}>{finalTotal}</span>
            <CurrencyIcon type='primary'/>
         </div>
            {/* @ts-ignore */}
            <Button onClick={() => dispatch(postFinalResult(constructorIngredients))} type="primary" size="medium">Оформить заказ</Button>
      </div>

      {orderModal && 
      <>
         {/* @ts-ignore */}
         <Modal onToggle={() =>  dispatch(closeOrderModal()) }>
            <OrderDetails number={order} />
         </Modal>
      </>
      }
      </>
   )
}



export default FinalResult