import style from './modal.module.css';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import { useAppSelector } from '../../services';
import { useParams } from 'react-router-dom';
import { ingredientsSelector } from '../../services/slices/ingredients-slice';
import { FC } from 'react';
import { TIngredient } from '../../utils/types';

const IngredientModalPage: FC = () => {

   const { ingredientId } = useParams<{ ingredientId: string}>()
   const { loading, ingredients } = useAppSelector(ingredientsSelector)
   const currentIngr =  ingredients.find((ingr) => ingr._id === ingredientId)
   
   return (
      <>
         {currentIngr && !loading && 
            <section className={`${style.container} pt-20 mt-15`}>
               <h2 className={`${style.title} text text_type_main-large mt-4 mb-2`}>Детали ингредиента</h2>
               <IngredientDetails />
            </section>
         }
      </>
   )
}

export default IngredientModalPage