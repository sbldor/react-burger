import style from './order-details.module.css';
import done from '../../images/done.png';
import { useAppSelector } from '../../services';
import { ingredientsSelector } from '../../services/slices/ingredients-slice';
import Error from '../error/error';
import Loader from '../loader/loader';
import { FC } from 'react';

interface IOrderDetals {
   number: number
}

const OrderDetails: FC<IOrderDetals> =({number}) => {
   const { orderError, orderLoading } = useAppSelector(ingredientsSelector)
   return (
      <div className={orderError ? style.flex : style.container}>
         {orderError && <Error error={orderError} />}
         {orderLoading && <Loader />}
         {!orderError && !orderLoading &&
         <>
            <p className='text text_type_digits-large mt-20'>{number}</p>
            <p className='text text_type_main-medium mt-8'>идентификатор заказа</p>
            <img className='mt-15 mb-15' src={done} alt="Заказ готовится" />
            <p className='text text_type_main-default mb-2'>Ваш заказ начали готовить</p>
            <p className='text text_type_main-default text_color_inactive mb-15'>Дождитесь готовности на орбитальной станции</p>
         </>}
      </div>
   )
}


export default OrderDetails