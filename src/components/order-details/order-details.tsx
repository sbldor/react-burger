import style from './order-details.module.css';
import done from '../../images/done.png';

const OrderDetails =() => {
   return (
      <div className={style.container}>
         <p className='text text_type_digits-large mt-20'>034536</p>
         <p className='text text_type_main-medium mt-8'>идентификатор заказа</p>
         <img className='mt-15 mb-15' src={done} alt="Заказ готовится" />
         <p className='text text_type_main-default mb-2'>Ваш заказ начали готовить</p>
         <p className='text text_type_main-default text_color_inactive mb-15'>Дождитесь готовности на орбитальной станции</p>
      </div>
   )
}

export default OrderDetails