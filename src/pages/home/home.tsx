import style from './home.module.css';
import BurgerIngredients from '../../components/burger-Ingredients/burger-Ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import Error from '../../components/error/error';
import Loader from '../../components/loader/loader';
import { useAppSelector } from '../../services';
import { ingredientsSelector } from '../../services/slices/ingredients-slice';
import { FC } from 'react';

const Home: FC = () => {

   const { loading, error } = useAppSelector(ingredientsSelector)

   return (
      <>
      { error && <Error error={error} />}
      { loading && <Loader /> }
      {!error && !loading &&
         <main className={style.main}>
            <BurgerIngredients />
            <BurgerConstructor />
         </main>
      }
      </>
   )

}

export default Home