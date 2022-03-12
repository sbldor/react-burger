import { useEffect } from 'react';
import style from './app.module.css';
import AppHeader from '../app-header/app-header';
import Error from '../error/error';
import Loader from '../loader/loader';
import BurgerIngredients from '../burger-Ingredients/burger-Ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIngredients, ingredientsSelector } from '../../services/slices/ingredients-slice';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const App = () => {

  const dispatch = useDispatch()
  const { loading, error, ingredients } = useSelector(ingredientsSelector)

  useEffect(()=>{
    dispatch(fetchIngredients())
  }, [])
  
  return (
      <div className={style.page}>
          <AppHeader />
          {error && <Error error={error}/>}
          {loading && <Loader/>}
          {!error && !loading && ingredients.lenght !==0 &&
            <main className={style.main}>
              <DndProvider backend={HTML5Backend}>
                <BurgerIngredients />
                <BurgerConstructor />
              </DndProvider>
            </main>
          }
      </div>
  );

}

export default App;
