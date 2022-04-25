import style from './modal.module.css'
import IngredientDetails from '../../components/ingredient-details/ingredient-details'
import { useSelector } from 'react-redux'
import { useParams, useLocation } from 'react-router-dom'
import { ingredientsSelector } from '../../services/slices/ingredients-slice'

const IngredientModalPage = () => {

   const { ingredientId } = useParams()
   const { loading, ingredients } = useSelector(ingredientsSelector)
   const currentIngr =  ingredients.find(ingr => ingr._id === ingredientId)
   const location = useLocation

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