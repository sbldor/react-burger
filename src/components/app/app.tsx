import { useEffect } from 'react';
import style from './app.module.css';
import AppHeader from '../app-header/app-header';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIngredients } from '../../services/slices/ingredients-slice';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Route, Switch, useHistory, useLocation } from 'react-router-dom'
import ProtectRoute from '../protect-route/protect-route';
import { getUser, authSelector, getToken } from '../../services/slices/auth-slice';
import { getCookie } from '../../utils/cookies';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { ingredientsSelector, removeIngredientDetails } from '../../services/slices/ingredients-slice'
import { Home, Login, Register, ForgotPassword, ResetPassword, PageNotFound, Profile, IngredientModalPage } from '../../pages';

const App = () => {
  
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()
  let background = location.state && location.state.background;
  const { auth } = useSelector(authSelector)

  useEffect(()=>{
    dispatch(fetchIngredients())
    if (getCookie('refreshToken')) {
      dispatch(getUser())
      if (!auth) {
        dispatch(getToken())
        dispatch(getUser())
      }
    }
  }, [])

  const closeModal = () => {
    dispatch(removeIngredientDetails())
    history.goBack()
  }
  
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
              <ProtectRoute path='/profile' >
                <Profile />
              </ProtectRoute>
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
              <Route>
                <PageNotFound />
              </Route>
              
            </Switch>
        {background && 
          <Route path='/ingredients/:ingredientId' exact >
            <Modal onToggle={closeModal}>
              <h2 className={`${style.title} text text_type_main-large mt-4 mb-2`}>Детали ингредиента</h2>
              <IngredientDetails />
            </Modal>
          </Route>
        }

          </div>
      
      </div>
  );

}

export default App;


