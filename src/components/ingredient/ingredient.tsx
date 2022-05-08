import { useDrag } from 'react-dnd';
import style from './ingredient.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch, useAppSelector } from '../../services';
import { showIngredientDetails, ingredientsSelector } from '../../services/slices/ingredients-slice';
import { FC } from 'react';
import { TLocation, TIngredient } from '../../utils/types';
import { Link, useLocation } from 'react-router-dom';

interface IIngredirnt {
   ingr: TIngredient
}

const Ingredient: FC<IIngredirnt> = ({ingr}) => {

   const { constructorIngredients } = useAppSelector(ingredientsSelector);
   const dispatch = useAppDispatch();
   const location = useLocation<TLocation>();

   const count: number = constructorIngredients.filter((i: TIngredient) => i._id === ingr._id).length;

   const [{ isDrag }, dragRef] = useDrag({
      type: 'ingredient',
      item: () => ({ ingr }),
      collect: monitor => ({
         isDrag: monitor.isDragging()
      })
   })

   const styles: { boxShadow: string, borderRadius: number} = {
      boxShadow: isDrag ? 'inset 0 0 5px 1px #4C4CFF' : 'none',
      borderRadius: 10
   }

   return (
      <li style={styles} ref={dragRef} onClick={() => { dispatch(showIngredientDetails()) }}>
         <Link to={{ pathname: `/ingredients/${ingr._id}`, state: { background: location } }} className={`${style.link} mb-8`}>
            <img src={ingr.image} alt={ingr.name} className={'pr-4 pl-4 mb-1'} />
            <div className={`${style.price} mb-2`}>
               <p className='text text_type_digits-default pr-2'>{ingr.price}</p>
               <CurrencyIcon type='primary' />
            </div>
            <p className={`${style.name} text text_type_main-default`}>{ingr.name}</p>
            {count > 0 && <Counter count={count} size='default' />}
         </Link>
      </li> 
   )
}


export default Ingredient
