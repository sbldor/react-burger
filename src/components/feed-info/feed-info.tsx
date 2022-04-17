import style from './feed-info.module.css'

const FeedInfo = () => {


   return (
      <div className={style.container}>
         <div className={`${style.orders} mb-15 `}>
            <div className={`${style.cont_status}`}>
               <h2 className={`text text_type_main-medium mb-6 `}>Готовы:</h2>
               <div className={`${style.list} custom-scroll`}>
                  <p className={`${style.ready} text text_type_digits-default`}>777777</p>
                  <p className={`${style.ready} text text_type_digits-default`}>777777</p>
                  <p className={`${style.ready} text text_type_digits-default`}>777777</p>
                  <p className={`${style.ready} text text_type_digits-default`}>777777</p>
                  <p className={`${style.ready} text text_type_digits-default`}>777777</p>
                  <p className={`${style.ready} text text_type_digits-default`}>777777</p>
               </div>
            </div>
         
            <div className={style.cont_status}>
               <h2 className={`text text_type_main-medium mb-6 `}>В работе:</h2>
               <div className={`${style.list} custom-scroll`}>
                  <p className={`text text_type_digits-default`}>777777</p>
                  <p className={`text text_type_digits-default`}>777777</p>
                  <p className={`text text_type_digits-default`}>777777</p>
                  <p className={`text text_type_digits-default`}>777777</p>
               </div>
            </div>
         </div>
         <p className={`text text_type_main-medium`}>Выполнено за все время:</p>
         <p className={`text text_type_digits-large mb-15 ${style.count}`}>77777</p>
         <p className={`text text_type_main-medium`}>Выполнено за сегодня:</p>
         <p className={`text text_type_digits-large ${style.count}`}>777</p>
      </div>
   )
}

export default FeedInfo