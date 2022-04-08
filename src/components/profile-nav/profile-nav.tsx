import style from './profile-nav.module.css'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logoutRequest } from '../../services/slices/auth-slice'

const ProfileNav = () => {

   const dispatch = useDispatch()

   const onLogOut = () => {
      dispatch(logoutRequest());
   }

   return (
      <section className={style.nav}>
         <NavLink
            to='/profile' exact
            className={`${style.link} text text_type_main-medium text_color_inactive`}
            activeClassName={style.link_active}>
            Профиль
         </NavLink>
         <NavLink
            to='/profile/orders' exact
            className={`${style.link} text text_type_main-medium text_color_inactive`}
            activeClassName={style.link_active}>
            История заказов
         </NavLink>
         <NavLink
            to='/login' exact
            className={`${style.link} text text_type_main-medium text_color_inactive`}
            activeClassName={style.link_active}
            onClick={onLogOut}>
            Выход
         </NavLink>
         <span className={`${style.text} text text_type_main-default text_color_inactive mt-20`}>
            В этом разделе вы можете
            изменить свои персональные данные</span>
      </section>
   )
}

export default ProfileNav