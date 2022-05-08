import style from './burger-constructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import FinalResult from "../final-result/final-result";
import IngredientConstructor from '../ingredient-constructor/ingredient-consrtuctor';
import { useAppDispatch, useAppSelector } from '../../services';
import { ingredientsSelector,
         addIngredientToConstructor,
         deleteIngredientFromConstructor 
      } from '../../services/slices/ingredients-slice';
import { useDrop } from 'react-dnd';
import { FC } from 'react'
import { TIngredient } from '../../utils/types';

const BurgerConstructor: FC = () => {
   
   const dispatch = useAppDispatch();
   const { constructorIngredients } = useAppSelector(ingredientsSelector);
   const middleIngredients: TIngredient[] = constructorIngredients.filter((ingr) => ingr.type !== 'bun');
   const bun: TIngredient[] = constructorIngredients.filter((ingr) => ingr.type === 'bun');

   const [{ isOver }, dropTarget] = useDrop({
      accept: 'ingredient',
      drop: (item: {ingr: TIngredient}) => {
         if (item.ingr.type === 'bun') {
            dispatch(deleteIngredientFromConstructor(item.ingr))
            dispatch(addIngredientToConstructor(item.ingr))
         } else {
            dispatch(addIngredientToConstructor(item.ingr))
         }
      },
      collect: monitor => ({
         isOver: monitor.isOver()
      })
   })
   
   const styles: { outline: string, borderRadius: number | string } = {
      outline: isOver ? '2px solid #4C4CFF' : 'none',
      borderRadius: isOver ? 10 : 'none',
   }
   
   return (

      <section ref={dropTarget} style={styles} className={`${style.constructor} mt-25`} >
         {(constructorIngredients.length === 0) &&
         <span className='text text_type_main-medium mt-2'> Выбери булочку и перетащщи сюда) </span>}

         {(constructorIngredients.length !== 0) &&
         <>
            <div className={`${style.bun} ml-14 pb-4`}>
               {bun.length >= 1 &&
               <ConstructorElement
                  type='top'
                  isLocked={true}
                  text={bun[0].name + '(верх)'}
                  price={bun[0].price}
                  thumbnail={bun[0].image}
               />
               }
            </div>

            <ul className={`${style.middle} custom-scroll mb-4 mt-4`}>
               {(middleIngredients.length === 0) &&
                  <span className='text text_type_main-medium mt-4'> А теперь остальное)  если захочешь пменять булочку, ты можешь сделать это в любой момент, просто перетащи новую) </span>}
               
               {middleIngredients.length >= 1 && middleIngredients.map((ingr, index) => (
                  <IngredientConstructor item={ingr} index={index} key={ingr.id} />
               )
               )}
            </ul>

            <div className={`${style.bun} ml-14 mb-10 pt-4`}>
               {bun.length >= 1 &&
               <ConstructorElement
                  type='bottom'
                  isLocked={true}
                  text={bun[0].name + '(низ)'}
                  price={bun[0].price}
                  thumbnail={bun[0].image}
               />}
            </div> 
         </>}
         {constructorIngredients.length >= 1 && <FinalResult/>}

      </section>
   )
}

export default BurgerConstructor