import style from './modal.module.css'
import IngredientDetails from '../../components/ingredient-details/ingredient-details'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { ingredientsSelector } from '../../services/slices/ingredients-slice'
import Home from '../home/home'
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const IngredientModalPage = () => {

   const { ingredientId } = useParams()
   const { loading, ingredients, ingredientDetailsModal } = useSelector(ingredientsSelector)
   const currentIngr =  ingredients.find(ingr => ingr._id === ingredientId)

   return (
      <>
         {currentIngr && !loading && !ingredientDetailsModal &&
            <section className={`${style.container} pt-20 mt-15`}>
               <h2 className={`${style.title} text text_type_main-large mt-4 mb-2`}>Детали ингредиента</h2>
               <IngredientDetails />
            </section>
         }
         {ingredientDetailsModal &&
            <section >
               <DndProvider backend={HTML5Backend}>
                  <Home />
               </DndProvider>
            </section>
         }
      </>
   )
}

export default IngredientModalPage