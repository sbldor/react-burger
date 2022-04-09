import { Link, useLocation, Redirect } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import style from '../form.module.css';
import {authSelector, loginRequest, resetResetPass, resetForgotPass } from '../../services/slices/auth-slice'

const Login = () => {

   const dispatch = useDispatch()
   const { error, auth } = useSelector(authSelector)
   const location = useLocation()

   useEffect(() => {
      dispatch(resetResetPass())
      dispatch(resetForgotPass())
   }, [])

   const [formData, setFormData] = useState({
      email: '',
      password: ''
   });
   
   const changeFormData = e => {
      setFormData({
         ...formData,
         [e.target.name]: e.target.value
      })
   }

   const sendForm = e => {
      e.preventDefault()
      // @ts-ignore
      dispatch(loginRequest(formData))
   }

   if (auth) {
      return (
         <Redirect to={location?.state?.from || '/'} />
      )
   }

   return (
      <main className={style.main} >
         <div className={style.container}>
            <h1 className={`${style.title} mb-6 text_type_main-medium`}>Вход</h1>
            <form id='login' className={`${style.form} mb-20`} onSubmit={sendForm}>
               <Input 
                  type={'email'}
                  placeholder={'E-mail'}
                  onChange={changeFormData}
                  value={formData.email}
                  name={'email'}
                  error={false}
                  errorText={'Ошибка'}
                  size={'default'} />
               <PasswordInput
                  onChange={changeFormData}
                  value={formData.password}
                  name={'password'} />
               {error && <span className={`${style.error} text text_type_main-medium mb-4`}>{error}</span>}
               <Button type='primary' size='medium'>Войти</Button>
            </form>
            <div className={`${style.info} mb-4 text_type_main-medium `}>
               <span className={` ${style.span} text_type_main-default`}>Вы — новый пользователь?</span>
               <Link to='/register' className={`${style.link} ml-2 text_type_main-default`}>Зарегистрироваться</Link>
            </div>
            <div className={`${style.info} text_type_main-medium `}>
               <span className={` ${style.span} text_type_main-default`}>Забыли пароль?</span>
               <Link to='/forgot-password' className={`${style.link} ml-2 text_type_main-default`}>Восстановить пароль</Link>
            </div>
         </div>
      </main>
   )
}

export default Login