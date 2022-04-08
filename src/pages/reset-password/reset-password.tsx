import { Redirect, Link, useHistory, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import style from '../form.module.css';
import { resetError, resetPassword, authSelector } from '../../services/slices/auth-slice'

const ResetPassword = () => {

   const dispatch = useDispatch()
   const location = useLocation()
   const { resetPass, error, auth, forgotPass } = useSelector(authSelector)
   const [formData, addFormData] = useState({
      password: '',
      token: ''
   })

   const changeFormData = e => {
      addFormData({
         ...formData,
         [e.target.name]: e.target.value
      })
   }

   const resetErrorOnFocus = () => {
      dispatch(resetError())
   }

   const sendForm = e => {
      e.preventDefault()
      // @ts-ignore
      dispatch(resetPassword(formData))
   }

   if (!forgotPass) {
      return (
         <Redirect to='/forgot-password' />
      )
   }

   if (resetPass) {
      return (
         <Redirect to='/login' />
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
               <PasswordInput
                  onChange={changeFormData}
                  value={formData.password}
                  name={'password'} />
               <Input
                  type={'text'}
                  placeholder={'Введите код из письма'}
                  onChange={changeFormData}
                  onFocus={resetErrorOnFocus}
                  value={formData.token}
                  name={'token'}
                  error={false}
                  errorText={'Ошибка'}
                  size={'default'} />
               {error && <span className={`${style.error} text text_type_main-medium mb-4`}>{error}</span>}
               <Button type='primary' size='medium'>Сохранить</Button>
            </form>
            <div className={`${style.info} mb-4 text_type_main-medium`}>
               <span className={`${style.span} text_type_main-default`}>Вспомнили пароль?</span>
               <Link to='/login' className={`${style.link} ml-2 text_type_main-default`}>Войти</Link>
            </div>
         </div>
      </div>
   )
}

export default ResetPassword