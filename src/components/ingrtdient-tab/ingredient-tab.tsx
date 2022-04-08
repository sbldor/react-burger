
import style from './ingredient-tab.module.css';
import PropTypes from 'prop-types';
import Ingredients from "../../utils/prop-types";
import Ingredient from '../ingredient/ingredient';

const IngredientsTab = (props) => {
   return (


      <section ref={props.tabRef}>
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
   ingredients: PropTypes.arrayOf(Ingredients).isRequired,
   tabRef: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.shape({ current: PropTypes.any })
   ])
}

export default IngredientsTab