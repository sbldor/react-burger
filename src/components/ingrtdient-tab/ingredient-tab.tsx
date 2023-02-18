import style from './ingredient-tab.module.css';
import Ingredient from '../ingredient/ingredient';
import { TIngredient } from '../../utils/types';
import { FC, MutableRefObject } from 'react'

interface IIngredientsTab {
   tabRef: MutableRefObject<HTMLDivElement>,
   name: string,
   ingredients: TIngredient[]
}

const IngredientsTab: FC<IIngredientsTab> = ({tabRef, name, ingredients}) => {

   return (
      <section ref={tabRef}>
         <h2 className={'text text_type_main-medium'}>{name}</h2>
         <ul className={`${style.products} mb-10 ml-4 mr-1`}>
            {ingredients.map((ingr: TIngredient) => {
               return ( 
                  <Ingredient ingr={ingr} key={ingr._id} />
                  )
               })
            }
         </ul>
      </section>
   )
}

export default IngredientsTab