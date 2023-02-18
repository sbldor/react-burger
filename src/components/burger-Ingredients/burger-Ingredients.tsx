import React, { useRef, FC, MutableRefObject } from 'react';
import style from './burger-Ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsTab from '../ingrtdient-tab/ingredient-tab';
import { useAppSelector } from '../../services';
import { ingredientsSelector } from '../../services/slices/ingredients-slice';
//import { TIngredient } from '../../utils/types';

const BurgerIngredients: FC = () => {

   const { ingredients } = useAppSelector(ingredientsSelector)
   const [current, setCurrent] = React.useState<string>('bun')

   const scrollRef = useRef<HTMLDivElement>(null);

   const mainRef = useRef<HTMLDivElement>(null);
   const sauceRef = useRef<HTMLDivElement>(null);
   const bunRef = useRef<HTMLDivElement>(null);

   const handleTabClick = (evt: string, ref: MutableRefObject<HTMLDivElement>) => {
      setCurrent(evt)
      ref.current.scrollIntoView({ behavior: 'smooth' })
   }

   const findIngredients = (ingredientsType: string) => ingredients.filter((ingr) => ingr.type === ingredientsType);

   const handleScroll = () => {
      const scrollPosition: number = scrollRef.current.getBoundingClientRect().top

      const bunCheck: number = Math.abs(scrollPosition - bunRef.current.getBoundingClientRect().top)
      const sauceCheck: number = Math.abs(scrollPosition - sauceRef.current.getBoundingClientRect().top)
      const maindCheck: number = Math.abs(scrollPosition - mainRef.current.getBoundingClientRect().top)

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