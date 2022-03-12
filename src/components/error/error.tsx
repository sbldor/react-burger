import style from './error.module.css';

const Err = ({error}) => {
   return (
      <p className={`text text_type_main-large mt-5 ${style.error}`}>{error}</p>
   )
}

export default Err