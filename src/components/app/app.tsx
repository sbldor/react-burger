import { useEffect, useState } from 'react';
import style from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-Ingredients/burger-Ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { IngredientContext } from '../../services/ingredient-context';
import { API_BURGERS } from '../../utils/api'

const App = () => {

  const [ingredients, setIngredients] = useState();
  const [load, setLoad] = useState(true);
  const [error, setError] = useState(null);

  const resCheck = (res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Что-то пошло не так( Ошибка: ${res.status}`)
    }
  }

  useEffect(()=>{
    const getData = () => {
      fetch(API_BURGERS+`${'ingredients'}`)
      .then(resCheck)
      .then(res => setIngredients(res.data))
      .catch(err => setError(err.message))
      .finally(() => setLoad(false))
    }
    getData()
  }, [])
  return (
      <div className={style.page}>
          <AppHeader />
          {error && !load && <p className={`text text_type_main-large mt-5 ${style.error}`}>{error}</p>}
          {load && !error && <div className={style.loader}></div>}
          {!error && !load && ingredients &&
            <main className={style.main}>
              <IngredientContext.Provider value={{ingredients}}>
                <BurgerIngredients />
                <BurgerConstructor />
              </IngredientContext.Provider>  
            </main>
          }
      </div>
  );
}

export default App;
