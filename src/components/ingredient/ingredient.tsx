import { useDrag } from 'react-dnd';
import style from './ingredient.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { showIngredientDetails, ingredientsSelector } from '../../services/slices/ingredients-slice';
import PropTypes from 'prop-types';

const Ingredient = ({ingr}) => {
   const { constructorIngredients } = useSelector(ingredientsSelector)
   const dispatch = useDispatch()
   const count = constructorIngredients.filter(i => i._id === ingr._id).length
   const [{ isDrag }, dragRef] = useDrag({
      type: 'ingredient',
      item: () => ({ ingr }),
      collect: monitor => ({
         isDrag: monitor.isDragging()
      })
   })

   const styles = {
      boxShadow: isDrag ? 'inset 0 0 5px 1px #4C4CFF' : 'none',
      borderRadius: 10
   }

   return (
      <li style={styles} ref={dragRef} onClick={() => { dispatch(showIngredientDetails(ingr)) }}>
         <a href="#" className={`${style.link} mb-8`}>
            <img src={ingr.image} alt={ingr.name} className={'pr-4 pl-4 mb-1'} />
            <div className={`${style.price} mb-2`}>
               <p className='text text_type_digits-default pr-2'>{ingr.price}</p>
               <CurrencyIcon type='primary' />
            </div>
            <p className={`${style.name} text text_type_main-default`}>{ingr.name}</p>
            {count > 0 && <Counter count={count} size='default' />}
         </a>
      </li> 
   )
}

Ingredient.propTypes = {
   ingr: PropTypes.shape({
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired
   })
}

export default Ingredient
