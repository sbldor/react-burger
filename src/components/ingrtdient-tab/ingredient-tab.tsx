
import style from './ingredient-tab.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';


const IngredientsTab = (props) => {
   return (
      <section className={style.container} ref={props.tabRef}>
         <h2 className={'text text_type_main-medium'}>{props.name}</h2>
         <ul className={`${style.products} mb-10 ml-4 mr-1`}>
            {props.ingredients.map(ingr => {
               return ( 
                     <li className={style.product} key={ingr._id}>
                        <a href="#" className={`${style.link} mb-8`}>
                           <img src={ingr.image} alt={ingr.name} className={'pr-4 pl-4 mb-1'} />
                           <div className={`${style.price} mb-2`}>
                              <p className='text text_type_digits-default pr-2'>{ingr.price}</p>
                              <CurrencyIcon type='primary' />  
                           </div>
                           <p className={`${style.name} text text_type_main-default`}>{ingr.name}</p>
                        <Counter count={ingr.__v} size='default'/>
                        </a> 
                     </li> 
                  )
               })
            }
         </ul>
      </section>
   )
}

export default IngredientsTab