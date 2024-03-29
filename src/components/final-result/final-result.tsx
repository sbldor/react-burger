import React from 'react';
import style from './final-result.module.css';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { useAppDispatch, useAppSelector } from '../../services';
import { postFinalResult, closeOrderModal, openOrderModal, ingredientsSelector } from '../../services/slices/ingredients-slice';
import { useHistory } from 'react-router-dom';
import { authSelector } from '../../services/slices/auth-slice';
import { FC } from 'react';
//import { TIngredient } from '../../utils/types';

const FinalResult: FC = () => {

   const { order, orderModal, constructorIngredients } = useAppSelector(ingredientsSelector)
   const { auth } = useAppSelector(authSelector)
   const history = useHistory()
   const dispatch = useAppDispatch()

   const finalTotal = React.useMemo<number>(
      () => {
         const total = constructorIngredients.filter((ingr) => ingr.type !== 'bun').reduce((sum, it) => sum + it.price, 0);
         const totalBun = constructorIngredients.some((ingr) => ingr.type === 'bun') ? constructorIngredients.find((ingr) => ingr.type === 'bun').price : 0
         return total + totalBun;
      },
      [constructorIngredients]
   )

   const addOrder = () => {
      if (auth) {
         dispatch(openOrderModal())
         dispatch(postFinalResult(constructorIngredients))
      } else { 
         history.replace({ pathname: '/login' })
      }
   }

   return (
      <>
      {constructorIngredients.length >1 &&
      <div className={`${style.container} mr-8`}>
         <div className={`${style.total} mr-10`}>
            <span className={'text text_type_digits-medium mr-2'}>{finalTotal}</span>
            <CurrencyIcon type='primary'/>
         </div>
            
            <Button onClick={() => addOrder()} type="primary" size="medium">Оформить заказ</Button>
      </div>
      }
      

      {orderModal && 
      <>
         <Modal onToggle={() =>  dispatch(closeOrderModal()) }>
            <OrderDetails number={order} />
         </Modal>
      </>
      }
      </>
   )
}



export default FinalResult