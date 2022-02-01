
import style from './final-result.module.css';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import ingredients from "../../utils/prop-types";

const FinalResult = (props) => {

const total = props.data.reduce((sum, it) => sum + it.price, 0)

   return (
      <div className={`${style.container} mr-8`}>
         <div className={`${style.total} mr-10`}>
            <span className={'text text_type_digits-medium mr-2'}>{total}</span>
            <CurrencyIcon type='primary'/>
         </div>
         <Button type="primary" size="medium">{props.children}</Button>
      </div>
   )
}

FinalResult.propTypes = {
   data: PropTypes.arrayOf(ingredients),
   children: PropTypes.string.isRequired

}

export default FinalResult