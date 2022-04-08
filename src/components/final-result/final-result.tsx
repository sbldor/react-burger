import React from 'react';
import style from './final-result.module.css';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { useDispatch, useSelector } from 'react-redux';
import { postFinalResult, closeOrderModal, ingredientsSelector } from '../../services/slices/ingredients-slice';
import { useHistory } from 'react-router-dom'
import { authSelector } from '../../services/slices/auth-slice'

const FinalResult = () => {

   const { order, orderModal, constructorIngredients } = useSelector(ingredientsSelector)
   const { auth } = useSelector(authSelector)
   const history = useHistory()
   const dispatch = useDispatch()

   const finalTotal = React.useMemo(
      () => {
         const total = constructorIngredients.filter(ingr => ingr.type !== 'bun').reduce((sum, it) => sum + it.price, 0);
         const totalBun = constructorIngredients.some(ingr => ingr.type === 'bun') ? constructorIngredients.find(ingr => ingr.type === 'bun').price : 0
         return total + totalBun;
      },
      [constructorIngredients]
   )

   const addOrder = () => {
      if (auth) {
         //@ts-ignore
         dispatch(postFinalResult(constructorIngredients))
      } else { 
         history.replace({ pathname: '/login' })
      }
   }

   return (
      <>
      <div className={`${style.container} mr-8`}>
         <div className={`${style.total} mr-10`}>
            <span className={'text text_type_digits-medium mr-2'}>{finalTotal}</span>
            <CurrencyIcon type='primary'/>
         </div>
            
            <Button onClick={() => dispatch(addOrder())} type="primary" size="medium">Оформить заказ</Button>
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