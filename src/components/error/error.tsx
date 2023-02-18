import style from './error.module.css';
import { FC } from 'react';

interface IError {
   error: string,
};

const Err: FC<IError> = ({error}) => {
   return (
      <p className={`text text_type_main-large mt-5 ${style.error}`}>{error}</p>
   )
}

export default Err