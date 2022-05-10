import { Redirect, Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import style from '../form.module.css';
import { useAppDispatch, useAppSelector } from '../../services';
import { forgotPassword, authSelector } from '../../services/slices/auth-slice';
import { FC } from 'react';
import { TLocation } from '../../utils/types';

const ForgotPassword: FC = () => {
   const dispatch = useAppDispatch()
   const { forgotPass, auth } = useAppSelector(authSelector)
   const location = useLocation<TLocation>()
   const [email, addEmail] = useState<string>('')

   const sendForm = (e: { preventDefault: ()=> void}) => {
      e.preventDefault()
      dispatch(forgotPassword(email))
   }

   if (forgotPass) {
      return (
         <Redirect to='/reset-password' />
      )
   }

   if (auth) {
      return (
         <Redirect to={location?.state?.from || '/'} />
      )
   }

   return (
      <div className={style.main}>
         <div className={style.container}>
            <h1 className={`${style.title} mb-6 text_type_main-medium`}>Восстановление пароля</h1>
            <form id='forgot-password-form' className={`${style.form} mb-20`} onSubmit={sendForm}>
               <Input
                  type={'email'}
                  placeholder={'Укажите e-mail'}
                  onChange={e => addEmail(e.target.value)}
                  value={email}
                  name={'email'}
                  error={false}
                  errorText={'Ошибка'}
                  size={'default'} />
               <Button type='primary' size='medium'>Восстановить</Button>
            </form>

            <div className={`${style.info} mb-4 text_type_main-medium`}>
               <span className={` ${style.span} text_type_main-default`}>Вспомнили пароль?</span>
               <Link to='/login' className={`${style.link} ml-2 text_type_main-default`}>Войти</Link>
            </div>
         </div>
      </div>
   )
}

export default ForgotPassword