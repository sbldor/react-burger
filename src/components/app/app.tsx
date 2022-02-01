
import AppHeader from '../app-header/app-header';
import style from './app.module.css';
import BurgerIngredients from '../burger-Ingredients/burger-Ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor'
import data from '../../utils/data'

const App = () => {
  return (
    
      <div className={style.page}>
        <AppHeader />
          <main className={style.main}>
            <BurgerIngredients data={data}/>
            <BurgerConstructor data={data}/>
          </main>
      </div>
    
  );
}

export default App;
