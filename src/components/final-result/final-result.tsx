import { useState, useContext } from 'react';
import style from './final-result.module.css';
import PropTypes from 'prop-types';
import ingredients from "../../utils/prop-types";
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredienttContext } from '../../services/ingredient-context';


const FinalResult = (props) => {

   const { ingredients } = useContext(IngredienttContext)

   const total = ingredients.filter(ingr => ingr.type !== 'bun').reduce((sum, it) => sum + it.price, 0);
   const totalBun = ingredients.filter(ingr => ingr.type === 'bun')[0].price * 2;
   const finalTotal = total + totalBun;

   return (
      <div className={`${style.container} mr-8`}>
         <div className={`${style.total} mr-10`}>
            <span className={'text text_type_digits-medium mr-2'}>{finalTotal}</span>
            <CurrencyIcon type='primary'/>
         </div>
         <Button onClick={props.onToggle} type="primary" size="medium">{props.children}</Button>
      </div>
   )
}

FinalResult.propTypes = {
   children: PropTypes.string.isRequired,
   onToggle: PropTypes.func.isRequired
}

export default FinalResult