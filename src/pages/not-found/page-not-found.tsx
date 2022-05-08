import style from './page-not-found.module.css';
import { Link } from 'react-router-dom';
import { FC } from 'react';

const PageNotFound: FC = () => {
   return (
      <div className={style.main}>
         <span className="text_type_main-large">Ошибка 404 - страницу не удалось найти</span>
         <Link to="/" className={`${style.link} text_type_main-default`}>Главная страница</Link>
      </div>
   )
}

export default PageNotFound