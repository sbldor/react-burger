import React, { useRef } from 'react';
import style from './burger-Ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsTab from '../ingrtdient-tab/ingredient-tab';
import { useSelector } from 'react-redux'
import { ingredientsSelector } from '../../services/slices/ingredients-slice'



const BurgerIngredients = () => {

   const { ingredients } = useSelector(ingredientsSelector)
   const [current, setCurrent] = React.useState('bun')
   const scrollRef = useRef(null);
   const mainRef = useRef(null);
   const sauceRef = useRef(null);
   const bunRef = useRef(null);

   const handleTabClick = (evt, ref) => {
      setCurrent(evt)
      ref.current.scrollIntoView({ behavior: 'smooth' })
   }

   const findIngredients = (ingredientsType) => ingredients.filter(ingr => ingr.type === ingredientsType);

   const handleScroll = () => {
      const scrollPosition = scrollRef.current.getBoundingClientRect().top

      const bunCheck = Math.abs(scrollPosition - bunRef.current.getBoundingClientRect().top)
      const sauceCheck = Math.abs(scrollPosition - sauceRef.current.getBoundingClientRect().top)
      const maindCheck = Math.abs(scrollPosition - mainRef.current.getBoundingClientRect().top)

      if (bunCheck < sauceCheck) {
         setCurrent('bun')
      } else if (sauceCheck < maindCheck) {
         setCurrent('sauce')
      } else {
         setCurrent('main')
      }
   }

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

         <div ref={scrollRef} onScroll={handleScroll} className={`${style.container} custom-scroll`}>
            <IngredientsTab tabRef={bunRef} name='Булки' ingredients={findIngredients('bun')}/>

            <IngredientsTab tabRef={sauceRef} name='Соусы' ingredients={findIngredients('sauce')}/>
            
            <IngredientsTab tabRef={mainRef} name='Начинки' ingredients={findIngredients('main')}/>
         </div>
         
      </section>
   )
}

export default BurgerIngredients