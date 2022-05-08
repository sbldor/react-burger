import style from './profile-info.module.css'
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { useState, useEffect } from 'react'
import { resetError, authSelector, getUser, updateUser, getToken } from '../../services/slices/auth-slice'
import { useAppDispatch, useAppSelector } from '../../services'
import { getCookie } from '../../utils/cookies';
import { FC } from 'react';
import { TUserData } from '../../utils/types'

const ProfileInfo: FC = () => {

   const dispatch = useAppDispatch()
   const { error, userData } = useAppSelector(authSelector)
   const [formData, setFormData] = useState<TUserData>({
      name: '',
      email: '',
      password: ''
   })
   const [btns, viewBtns] = useState<boolean>(false)

   useEffect(() => {
      if (
         localStorage.getItem("refreshToken") &&
         getCookie("accessToken") == null
      ) {
         
         dispatch(getToken()).then(() => dispatch(getUser()));
      }
      if (getCookie("accessToken")) {
         dispatch(getUser());
      }
   }, []);

   const onFocus = () => {
      dispatch(resetError())
      viewBtns(true)
   }

   const resetForm = (e: { preventDefault: () => void }) => {
      e.preventDefault()
      viewBtns(false)
      setFormData({
         name: userData.name,
         email: userData.email,
         password: userData.password
      })
   }

   const updateUserInfo = (e: { preventDefault: () => void }) => {
      e.preventDefault()
      viewBtns(false)
      dispatch(updateUser(formData))
   }

   useEffect(() => {
      dispatch(getUser())
      setFormData({
         name: userData.name,
         email: userData.email,
         password: userData.password
      })
   }, [userData])

   const changeFormData = (e: {target:{name:string, value: string}}) => {
      setFormData({
         ...formData,
         [e.target.name]: e.target.value
      })
   }

   return (
      <form className={`${style.form} input_size_default`} onFocus={null}>
         <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={changeFormData}
            onFocus={onFocus}
            icon={'EditIcon'}
            value={formData.name}
            name={'name'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
         />
         <Input
            type={'email'}
            name={'email'}
            onFocus={onFocus}
            placeholder={'E-mail'}
            onChange={changeFormData}
            icon={'EditIcon'}
            value={formData.email}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
         />
         <Input
            type={'password'}
            name={'password'}
            onFocus={onFocus}
            placeholder={'Пароль'}
            onChange={changeFormData}
            icon={'EditIcon'}
            value={formData.password}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
         />

         {error && <span className={`${style.error} text text_type_main-medium mb-4`}>{error}</span>}

         {btns && <div>
            <Button type={"primary"} size={"medium"} onClick={updateUserInfo}>Сохранить</Button>
            <Button type={"secondary"} size={"medium"} onClick={resetForm}>Отмена</Button>
         </div>}
      </form>
   )
}

export default ProfileInfo