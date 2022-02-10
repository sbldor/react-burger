import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './app-header.module.css';

const AppHeader = () => {
   return (
      <header className={style.header}>
         <nav className={style.navbar}>
            <div className={style.container}>
               <a className={`${style.link} mr-15`} href='#'>
                  <BurgerIcon type="primary" />
                  <span className="text text_type_main-default ml-2">Конструктор</span>
               </a>

               <a className={`${style.link}`} href='#'>
                  <ListIcon type="secondary" />
                  <span className="text text_type_main-default text_color_inactive ml-2">Лента заказов</span>
               </a>
            </div>
            <div className={style.logo}>
               <a className={`${style.link} mr-5 ml-5`} href="#"> <Logo/> </a>

               <a className={`${style.link} mr-5`} href='#'>
                  <ProfileIcon type="secondary" />
                  <span className="text text_type_main-default text_color_inactive ml-2">Личный кабинет</span>
               </a>
            </div>
         </nav>
      </header>
   )
}

export default AppHeader