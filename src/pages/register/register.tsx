import { Link, useHistory, useLocation, Redirect } from 'react-router-dom'
import { useState } from 'react';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import style from '../form.module.css';
import { registerUser, authSelector, resetError } from '../../services/slices/auth-slice'
import { useDispatch, useSelector } from 'react-redux'

const Register = () => {

   const { error, auth } = useSelector(authSelector)
   const dispatch = useDispatch()
   const location = useLocation()
   const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: ''
   });

   const changeFormData = e => {
      setFormData({
         ...formData,
         [e.target.name]: e.target.value
      })
   }

   const resetErrorOnFocus = () => {
      dispatch(resetError())
   }

   const register = e => {
      e.preventDefault()
      // @ts-ignore
      dispatch(registerUser(formData))
   }

   if (auth) {
      return (
         <Redirect to={location?.state?.from || '/'} />
      )
   }

   return (
      <div className={style.main}>
         <div className={style.container}>
            <h1 className={`${style.title} mb-6 text_type_main-medium`}>Регистрация</h1>
            <form id='register-form' className={`${style.form} mb-20`} onSubmit={register}>
               <Input
                  type={'text'}
                  placeholder={'Имя'}
                  onChange={changeFormData}
                  onFocus={resetErrorOnFocus}
                  value={formData.name}
                  name={'name'}
                  error={false}
                  errorText={'Ошибка'}
                  size={'default'} />
               <Input
                  type={'email'}
                  placeholder={'E-mail'}
                  onChange={changeFormData}
                  onFocus={resetErrorOnFocus}
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
               <Button type='primary' size='medium'>Зарегистрироваться</Button>
            </form>
            <div className={`${style.info} mb-4 text_type_main-medium`}>
               <span className={`${style.span} text_type_main-default`}>Уже зарегистрированы?</span>
               <Link to='/login' className={`${style.link} ml-2 text_type_main-default`}>Войти</Link>
            </div>
         </div>
      </div>
   )
}

export default Register