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
import { TIngredient } from '../../utils/types';

const FinalResult: FC = () => {

   const { order, orderModal, constructorIngredients } = useAppSelector(ingredientsSelector)
   const { auth } = useAppSelector(authSelector)
   const history = useHistory()
   const dispatch = useAppDispatch()

   const finalTotal: number = React.useMemo(
      () => {
         const total = constructorIngredients.filter((ingr: TIngredient) => ingr.type !== 'bun').reduce((sum: number, it: TIngredient) => sum + it.price, 0);
         const totalBun = constructorIngredients.some((ingr: TIngredient) => ingr.type === 'bun') ? constructorIngredients.find((ingr: TIngredient) => ingr.type === 'bun').price : 0
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