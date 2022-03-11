import style from './ingredient-details.module.css';
import ingredients from '../../utils/prop-types';
import PropTypes from 'prop-types';

const IngredientDetails = ({ingr}) => {
   return(
      <>
         <h2 className={`${style.title} text text_type_main-large mt-4 mb-2`}>Детали ингредиента</h2>
         <img className={style.image} src={ingr.image} alt={ingr.name} />
         <h3 className='text text_type_main-medium mt-4 mb-8'>{ingr.name}</h3>
         <ul className={style.container}>
            <li className={style.item}>
               <p className='text text_type_main-default text_color_inactive mb-2'>Калории, ккал</p>
               <p className='text text_type_digits-default text_color_inactive'>{ingr.calories}</p>
            </li>
            <li className={style.item}>
               <p className='text text_type_main-default text_color_inactive mb-2'>Булки, г</p>
               <p className='text text_type_digits-default text_color_inactive'>{ingr.proteins}</p>
            </li>
            <li className={style.item}>
               <p className='text text_type_main-default text_color_inactive mb-2'>Жиры, г</p>
               <p className='text text_type_digits-default text_color_inactive'>{ingr.fat}</p>
            </li>
            <li className={style.item}>
               <p className='text text_type_main-default text_color_inactive mb-2'>Углеводы, г</p>
               <p className='text text_type_digits-default text_color_inactive'>{ingr.carbohydrates}</p>
            </li>
         </ul>
      </>
   )
}

IngredientDetails.propTypes = {
   ingr: PropTypes.object.isRequired
}

export default IngredientDetails