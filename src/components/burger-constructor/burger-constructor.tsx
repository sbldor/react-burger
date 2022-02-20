import {  useContext } from 'react';
import style from './burger-constructor.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import FinalResult from "../final-result/final-result";
import { IngredientContext } from '../../services/ingredient-context';



const BurgerConstructor = () => {
   const { ingredients } = useContext(IngredientContext)
   const middleIngredients = ingredients.filter(ingr => ingr.type !== 'bun');
   const bun = ingredients.filter(ingr => ingr.type === 'bun');
   
   return (
      <section className={`${style.constructor} mt-25`}>

         <div className={`${style.bun} ml-14 pb-4`}>
            <ConstructorElement
               type='top'
               isLocked={true}
               text={bun[0].name + '(верх)'}
               price={bun[0].price}
               thumbnail={bun[0].image}
            />
         </div>

         <ul className={`${style.middle} custom-scroll mb-4 mt-4`}>
            {middleIngredients.map((ingr) => (
               <li className={`${style.ingredients} mr-3`} key={ingr._id}> 
                  <DragIcon type='primary'/>
                  <ConstructorElement
                     text={ingr.name}
                     price={ingr.price}
                     thumbnail={ingr.image}
                  />
               </li> 
               )
            )}
         </ul>

         <div className={`${style.bun} ml-14 mb-10 pt-4`}>
            <ConstructorElement
               type='bottom'
               isLocked={true}
               text={bun[0].name + '(низ)'}
               price={bun[0].price}
               thumbnail={bun[0].image}
            />
         </div>
         <FinalResult></FinalResult>
      </section>
   )
}

export default BurgerConstructor