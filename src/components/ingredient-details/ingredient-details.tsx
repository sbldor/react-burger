import style from './ingredient-details.module.css';
import PropTypes from 'prop-types';

const IngredientDetails = (props) => {
   return(
      <>
         <h2 className={`${style.title} text text_type_main-large mt-4 mb-2`}>Детали ингредиента</h2>
         <img className={style.image} src={props.image} alt={props.name} />
         <h3 className='text text_type_main-medium mt-4 mb-8'>{props.name}</h3>
         <ul className={style.container}>
            <li className={style.item}>
               <p className='text text_type_main-default text_color_inactive mb-2'>Калории, ккал</p>
               <p className='text text_type_digits-default text_color_inactive'>{props.calories}</p>
            </li>
            <li className={style.item}>
               <p className='text text_type_main-default text_color_inactive mb-2'>Булки, г</p>
               <p className='text text_type_digits-default text_color_inactive'>{props.proteins}</p>
            </li>
            <li className={style.item}>
               <p className='text text_type_main-default text_color_inactive mb-2'>Жиры, г</p>
               <p className='text text_type_digits-default text_color_inactive'>{props.fat}</p>
            </li>
            <li className={style.item}>
               <p className='text text_type_main-default text_color_inactive mb-2'>Углеводы, г</p>
               <p className='text text_type_digits-default text_color_inactive'>{props.carbohydrates}</p>
            </li>
         </ul>
      </>
   )
}

IngredientDetails.propTypes = {
   name: PropTypes.string.isRequired,
   image: PropTypes.string.isRequired,
   calories: PropTypes.number.isRequired,
   proteins: PropTypes.number.isRequired,
   fat: PropTypes.number.isRequired,
   carbohydrates: PropTypes.number.isRequired
}

export default IngredientDetails