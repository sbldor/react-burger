import { useHistory, useLocation } from 'react-router-dom';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './app-header.module.css';
import { useEffect, FC } from 'react';

const AppHeader: FC = () => {

   const history = useHistory();
   const { pathname } = useLocation();

   const home: boolean = pathname === '/';
   const feed: boolean = pathname === '/feed';
   const profile: boolean = pathname === '/profile' || pathname === '/profile/orders' || pathname === '/login';

   useEffect(()=>{
      if (pathname === '/') {
         history.replace({ pathname: '/' })
      }
   }, [history, pathname]);

   const onClickHome: () => void = () => {
      history.replace({ pathname: '/' })
   };

   const onClickFeed: () => void = () => {
      history.replace({ pathname: '/feed' })
   };

   const onClickLogin: () => void = () => {
      history.replace({ pathname: '/profile' })
   };

   const setClass = (state: boolean) => state ? style.button_active : style.button;
   const setIcon = (state: boolean) => state ? "primary" : "secondary";
   
   return (
      <header className={style.header}>
         <nav className={style.navbar}>
            <div className={style.container}>
               <button onClick={onClickHome} className={`${setClass(home)} mr-15`} >
                  <BurgerIcon type={setIcon(home)} />
                  <span className="text text_type_main-default ml-2">Конструктор</span>
               </button>

               <button onClick={onClickFeed} className={`${setClass(feed)}`} >
                  <ListIcon type={setIcon(feed)} />
                  <span className="text text_type_main-default ml-2">Лента заказов</span>
               </button>
            </div>
            <div className={style.logo}>
               <a className={`${style.link} mr-5 ml-5`} href="#"> <Logo/> </a>

               <button onClick={onClickLogin} className={`${setClass(profile)}`} >
                  <ProfileIcon type={setIcon(profile)} />
                  <span className="text text_type_main-default ml-2">Личный кабинет</span>
               </button>
            </div>
         </nav>
      </header>
   )
};

export default AppHeader