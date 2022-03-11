
import style from './ingredient-tab.module.css';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import PropTypes from 'prop-types';
import ingredients from "../../utils/prop-types";
import { removeIngredientDetails, ingredientsSelector } from '../../services/slices/ingredients-slice';
import { useDispatch, useSelector } from 'react-redux';
import Ingredient from '../ingredient/ingredient';

const IngredientsTab = (props) => {

   const dispatch = useDispatch()
   const { ingredientDetails, ingredientDetailsModal } = useSelector(ingredientsSelector)
   return (
      <section ref={props.tabRef}>

         {ingredientDetailsModal && 
            // @ts-ignore
            <Modal onToggle={() => { dispatch(removeIngredientDetails()) }}>
               <IngredientDetails ingr={ingredientDetails} />
            </Modal>
         }

         <h2 className={'text text_type_main-medium'}>{props.name}</h2>
         <ul className={`${style.products} mb-10 ml-4 mr-1`}>
            {props.ingredients.map(ingr => {
               return ( 
                  <Ingredient ingr={ingr} key={ingr._id} />
                  )
               })
            }
         </ul>
      </section>
   )
}

IngredientsTab.propTypes = {
   name: PropTypes.string.isRequired,
   ingredients: PropTypes.arrayOf(ingredients).isRequired,
   tabRef: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.shape({ current: PropTypes.any })
   ])
}

export default IngredientsTab