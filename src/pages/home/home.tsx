import style from './home.module.css'
import BurgerIngredients from '../../components/burger-Ingredients/burger-Ingredients'
import BurgerConstructor from '../../components/burger-constructor/burger-constructor'
import Error from '../../components/error/error';
import Loader from '../../components/loader/loader';
import { useSelector } from 'react-redux';
import { ingredientsSelector } from '../../services/slices/ingredients-slice';


const Home = () => {

   
   const { loading, error, ingredients } = useSelector(ingredientsSelector)

   return (
      <>
      { error && <Error error={error} />}
      { loading && <Loader /> }
      {!error && !loading && ingredients.lenght !== 0 &&
         <main className={style.main}>
            <BurgerIngredients />
            <BurgerConstructor />
         </main>
      }
      </>
   )

}

export default Home