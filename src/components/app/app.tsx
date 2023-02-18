import { useEffect } from 'react';
import style from './app.module.css';
import AppHeader from '../app-header/app-header';
import { useAppDispatch, useAppSelector } from '../../services';
import { fetchIngredients } from '../../services/slices/ingredients-slice';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Route, Switch, useHistory, useLocation } from 'react-router-dom'
import ProtectRoute from '../protect-route/protect-route';
import { authSelector, getToken } from '../../services/slices/auth-slice';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { removeIngredientDetails } from '../../services/slices/ingredients-slice'
import { Home, Login, Register, ForgotPassword, ResetPassword, PageNotFound, Profile, IngredientModalPage, Feed, ModalOrder } from '../../pages';
import FeedDetals from '../feed-detals/feed-detals';
import { TLocation } from '../../utils/types';

const App = () => {
  
  const dispatch = useAppDispatch()
  const location = useLocation<TLocation>()
  const history = useHistory()
  const background = location.state && location.state.background;

  useEffect(() => {
    dispatch(fetchIngredients());
  }, []);

  const closeModal: () => void = () => {
    dispatch(removeIngredientDetails())
    history.goBack()
  }

  const status: string = 'orders'
  
  return (
      <div className={style.page}>
          <AppHeader />
          <div>
            <Switch location={background || location}>
              <Route path='/' exact>
                <DndProvider backend={HTML5Backend}>
                  <Home />
                </DndProvider>
              </Route>
              <ProtectRoute path='/profile'>
                <Profile />
              </ProtectRoute>
              <Route path='/feed' exact >
                <Feed />
              </Route>
              <Route path='/login' exact>
                <Login />
              </Route>
              <Route path='/register' exact>
                <Register />
              </Route>
              <Route path='/forgot-password' exact>
                <ForgotPassword />
              </Route>
              <Route path='/reset-password' exact >
                <ResetPassword />
              </Route>
              <Route path='/ingredients/:ingredientId' exact>
                <IngredientModalPage />
              </Route>
              <Route path='/feed/:id' exact>
                <ModalOrder status={status}/>
              </Route>
              <Route>
                <PageNotFound />
              </Route>
              
            </Switch>
        {background && 
        <Switch>
          <Route path='/ingredients/:ingredientId' exact >
            <Modal onToggle={closeModal}>
              <h2 className={`${style.title} text text_type_main-large mt-4 mb-2`}>Детали ингредиента</h2>
              <IngredientDetails />
            </Modal>
          </Route>
          <Route path='/feed/:id' exact >
            <Modal onToggle={closeModal}>
              <FeedDetals />
            </Modal>
          </Route>
          <Route path='/profile/orders/:id' exact >
            <Modal onToggle={closeModal}>
              <FeedDetals />
            </Modal>
          </Route>
        </Switch>
        }

          </div>
      
      </div>
  );

}

export default App;


