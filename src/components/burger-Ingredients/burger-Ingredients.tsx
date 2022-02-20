import React, { useRef, useContext } from 'react';
import style from './burger-Ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsTab from '../ingrtdient-tab/ingredient-tab';
import { IngredientContext } from '../../services/ingredient-context';



const BurgerIngredients = () => {

   const { ingredients } = useContext(IngredientContext)

   const [current, setCurrent] = React.useState('main')
   const mainRef = useRef();
   const sauceRef = useRef();
   const bunRef = useRef();

   const handleTabClick = (evt, ref) => {
      setCurrent(evt)
      ref.current.scrollIntoView({ behavior: 'smooth' })
   }

   const findIngredients = (ingredientsType) => ingredients.filter(ingr => ingr.type === ingredientsType);

   return (
      <section className={style.ingredients}>
         <h1 className={'text text_type_main-large mt-10 mb-5'}>Соберите бургер</h1>
         <div className={`${style.tabs} mb-10`}>
            <Tab value="bun" active={current === 'bun'} onClick={evt => handleTabClick(evt, bunRef)}>
               Булки
            </Tab>
            <Tab value="sauce" active={current === 'sauce'} onClick={evt => handleTabClick(evt, sauceRef)}>
               Соусы
            </Tab>
            <Tab value="main" active={current === 'main'} onClick={evt => handleTabClick(evt, mainRef)}>
               Начинки
            </Tab>
         </div>

         <div className={`${style.container} custom-scroll`}>
            <IngredientsTab tabRef={mainRef} name='Начинки' ingredients={findIngredients('main')}/>

            <IngredientsTab tabRef={sauceRef} name='Соусы' ingredients={findIngredients('sauce')}/>
            
            <IngredientsTab tabRef={bunRef} name='Булки' ingredients={findIngredients('bun')}/>
         </div>
         
      </section>
   )
}

export default BurgerIngredients