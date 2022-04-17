import style from './feed.module.css'
import Orders from '../../components/orders/orders';
import FeedInfo from '../../components/feed-info/feed-info';
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';




const Feed = () => {

   return (
      <main className={style.main}>
         <h2 className='text text_type_main-large mt-10'>Лента заказов</h2>
         <div className={style.cont}>
            <div  className={`${style.feeds} mt-5 custom-scroll `}>
               <Orders />
               <Orders />
               <Orders />
               <Orders />
            </div>
            <FeedInfo/>
         </div>
      </main>
   )

}

export default Feed