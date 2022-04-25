import style from './feed.module.css'
import Orders from '../../components/orders/orders';
import FeedInfo from '../../components/feed-info/feed-info';
import { useDispatch, useSelector } from 'react-redux';
import { wsSelector } from "../../services/slices/feed-ws-slice";
import { wsUrl } from '../../utils/api';
import { wsClose, wsStart } from "../../services/slices/feed-ws-slice";
import { useEffect } from "react";
import Loader from '../../components/loader/loader';



const Feed = () => {

   const dispatch = useDispatch();
   const { feed } = useSelector(wsSelector);

   useEffect(() => {
      dispatch(wsStart({ url: `${wsUrl}/all` }));
      return () => {
         dispatch(wsClose());
      };
   }, []);


   return (
      <main className={style.main}>
         <h2 className='text text_type_main-large mt-10'>Лента заказов</h2>
         <div className={style.cont}>
            {feed.length === 0 && <Loader/>}
            {feed.length !== 0 &&
            <>
               <div  className={`${style.feeds} mt-5 custom-scroll `}>
                  <Orders feed={feed}/>
               </div>
               <FeedInfo feed={feed}/>
            </>}
         </div>
      </main>
   )

}

export default Feed