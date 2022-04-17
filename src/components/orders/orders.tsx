import style from "./orders.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { ingredientsSelector } from '../../services/slices/ingredients-slice';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const Orders = () => {
   const { ingredients } = useSelector(ingredientsSelector)
   const ingrs = ingredients.slice(1, 6).reverse()
   const lastIngrs = ingredients.slice(6, 7)
   const countLotsOfIngrs = ingredients.slice(6).length

   return (
      <div className={`${style.feed} p-6 mb-4 mr-2` }>
         <div className={`${style.cont_info}`}>
            <p className='text text_type_digits-default'>#777</p>
            <p className='text text_type_main-small text_color_inactive'>Сегодня, 16:20 i-GMT+3</p>
         </div>
         <h3 className='text text_type_main-large mt-6'>name burger</h3>
         <div className={`${style.order_cont} mt-6`}>
            <div className={style.images}>
               {lastIngrs.length &&
                  <div className={style.count}>
                     <p className={`${style.count_c} text text_type_main-small `}>+{countLotsOfIngrs}</p>
                     <img className={style.order_image_all} src={lastIngrs[0].image_mobile} alt='1' />
                  </div>
               }
               {ingrs && ingrs.map((i, ind) => {
                  return <img className={style.order_image} src={i.image_mobile} alt='1' key={ind} />
               })}
            </div>
            <div className={style.resalt}>
               <CurrencyIcon type='primary' />
               <p className='text text_type_digits-default ml-2'>777</p>
            </div>
         </div>
      </div>
   )
}

export default Orders