import style from './ingredient-details.module.css';
import { useParams } from 'react-router-dom'
import { ingredientsSelector } from '../../services/slices/ingredients-slice'
import { useAppSelector } from '../../services'
import { TIngredient } from '../../utils/types';
import { useMemo } from 'react'

const IngredientDetails = () => {

   const { ingredients, loading } = useAppSelector(ingredientsSelector)
   const { ingredientId } = useParams<{ingredientId:string}>()

   const currentIngr = useMemo<TIngredient>(
      () => ingredients.find((item: TIngredient) => item._id === ingredientId),
   [ingredients, ingredientId])
   
   return(
      <>
         {currentIngr && !loading &&
      <section>
         <img className={style.image} src={currentIngr.image} alt={currentIngr.name} />
         <h3 className='text text_type_main-medium mt-4 mb-8'>{currentIngr.name}</h3>
         <ul className={style.container}>
            <li className={style.item}>
               <p className='text text_type_main-default text_color_inactive mb-2'>Калории, ккал</p>
               <p className='text text_type_digits-default text_color_inactive'>{currentIngr.calories}</p>
            </li>
            <li className={style.item}>
               <p className='text text_type_main-default text_color_inactive mb-2'>Булки, г</p>
               <p className='text text_type_digits-default text_color_inactive'>{currentIngr.proteins}</p>
            </li>
            <li className={style.item}>
               <p className='text text_type_main-default text_color_inactive mb-2'>Жиры, г</p>
               <p className='text text_type_digits-default text_color_inactive'>{currentIngr.fat}</p>
            </li>
            <li className={style.item}>
               <p className='text text_type_main-default text_color_inactive mb-2'>Углеводы, г</p>
               <p className='text text_type_digits-default text_color_inactive'>{currentIngr.carbohydrates}</p>
            </li>
         </ul>
      </section>
      }
   </>
   )
}

export default IngredientDetails