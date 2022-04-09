import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { baseUrl, resCheck } from '../../utils/api'
import { getCookie, setCookie, deleteCookie } from '../../utils/cookies';

export const initialState = {
   auth: false,
   loading: false,
   error: '',
   userData: {
      email: '',
      password: '',
      name: '',
   },
   forgotPass: false,
   resetPass: false,
}

const authSlice = createSlice({
   name: 'aurh',
   initialState,
   reducers: {
      checkAuth: state => { 
         getCookie('refreshToken') ? getToken() : state.auth = false
      },
      resetError: state => { 
         state.error = '' 
      },
      resetForgotPass: state => {
         state.forgotPass = false 
      },
      resetResetPass: state => {
         state.resetPass = false 
      },
   },
   extraReducers: bulder => {
      bulder
         // registerUser
         .addCase(registerUser.pending, state => {
            state.loading = true
         })
         .addCase(registerUser.fulfilled, (state, { payload }) => {
            state.loading = false
            state.auth = true
            state.userData.name = payload.user.name
            state.userData.email = payload.user.email
            state.userData.password = ''
            state.error = ''
            setCookie('accessToken', payload.accessToken, { expires: 1 * 60 });
            setCookie('refreshToken', payload.refreshToken)
         })
         .addCase(registerUser.rejected, (state, { payload }) => {
            state.loading = false
            state.error = `Зарегестрироваться не удалось: ${payload}`
         })

         // forgotPassword
         .addCase(forgotPassword.pending, state => {
            state.loading = true
         })
         .addCase(forgotPassword.fulfilled, state => {
            state.loading = false
            state.error = ''
            state.forgotPass = true

         })
         .addCase(forgotPassword.rejected, (state, { payload }) => {
            state.loading = false
            state.error = `Отправить код не удалось: ${payload}`
         })

         // resetPassword
         .addCase(resetPassword.pending, state => { 
            state.loading = true 
         })
         .addCase(resetPassword.fulfilled, (state, { payload }) => {
            state.loading = false
            state.resetPass = true
            state.error = ''
         })
         .addCase(resetPassword.rejected, (state, { payload }) => {
            state.loading = false
            state.error = `Обновить пароль не удалось: ${payload}`
         })

         // loginRequest
         .addCase(loginRequest.pending, state => { 
            state.loading = true 
         })
         .addCase(loginRequest.fulfilled, (state, { payload }) => {
            state.loading = false
            state.error = ''
            state.auth = true
            state.userData.name = payload.user.name
            state.userData.email = payload.user.email
            state.userData.password = ''
            setCookie('accessToken', payload.accessToken, { expires: 1 * 60 });
            setCookie('refreshToken', payload.refreshToken)
         })
         .addCase(loginRequest.rejected, (state, { payload }) => {
            state.loading = false
            state.error = `Войти в аккаунт не удалось: ${payload}`
         })

         // logoutRequest
         .addCase(logoutRequest.pending, state => { 
            state.loading = true 
         })
         .addCase(logoutRequest.fulfilled, (state, { payload }) => {
            state.loading = false
            state.auth = false
            state.userData.name = ''
            state.userData.email = ''
            state.userData.password = ''
            state.error = ''
            deleteCookie('accessToken')
            deleteCookie('refreshToken')
         })
         .addCase(logoutRequest.rejected, (state, { payload }) => {
            state.loading = false
            state.error = `Выйти не удалось: ${payload}`
         })

         // getUser
         .addCase(getUser.pending, state => { 
            state.loading = true 
         })
         .addCase(getUser.fulfilled, (state, { payload }) => {
            state.loading = false
            state.auth = true
            state.userData.name = payload.user.name
            state.userData.email = payload.user.email
            state.userData.password = ''
            state.error = ''
         })
         .addCase(getUser.rejected, (state, { payload }) => {
            state.auth = false
            state.loading = false
            state.userData.name = ''
            state.userData.email = ''
            state.userData.password = ''
            state.error = `Не удалось получить данные пользователя: ${payload}`
         })

         // updateUser
         .addCase(updateUser.pending, state => { 
            state.loading = true 
         })
         .addCase(updateUser.fulfilled, (state, { payload }) => {
            state.loading = false
            state.auth = true
            state.userData.name = payload.user.name
            state.userData.email = payload.user.email
            state.userData.password = ''
            state.error = ''
         })
         .addCase(updateUser.rejected, (state, { payload }) => {
            state.loading = false
            state.error = `Не удалось обновить данные пользователя: ${payload}`
         })

         // getToken
         .addCase(getToken.pending, state => { 
            state.loading = true 
         })
         .addCase(getToken.fulfilled, (state, { payload }) => {
            setCookie('accessToken', payload.accessToken, { expires: 1 * 60 })
            setCookie('refreshToken', payload.refreshToken)
            state.auth = true
         })
         .addCase(getToken.rejected, (state, { payload }) => {
            state.auth = false
            state.loading = false
            state.error = `Ошибка: ${payload}`
         })
   }
})

export const {
   checkAuth,
   resetError,
   resetForgotPass,
   resetResetPass
} = authSlice.actions

export const authSelector = state => state.auth
export const authReducer = authSlice.reducer

export const registerUser = createAsyncThunk(
   'auth/registerUser',
   async (form, { rejectWithValue }) => {
      try {
         const res = await fetch(baseUrl + 'auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
         })
         const data = await resCheck(res)
         return data
      } catch (err) {
         return rejectWithValue(err)
      }
   }
)

export const forgotPassword = createAsyncThunk(
   'auth/forgotPassword',
   // @ts-ignore
   async (email, { rejectWithValue }) => {
      try {
         const res = await fetch(baseUrl + 'password-reset', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 'email': email })
         })
         const data = await resCheck(res)
         return data
      } catch (err) {
         return rejectWithValue(err)
      }
   }
)

export const resetPassword = createAsyncThunk(
   'auth/resetPassword',
   // @ts-ignore
   async (form, { rejectWithValue }) => {
      try {
         const res = await fetch(baseUrl + 'password-reset/reset', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
         })
         const data = await resCheck(res)
         return data
      } catch (err) {
         return rejectWithValue(err)
      }
   }
)

export const loginRequest = createAsyncThunk(
   'auth/login',
   // @ts-ignore
   async (form, { rejectWithValue }) => {
      try {
         const res = await fetch(baseUrl + 'auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
         })
         const data = await resCheck(res)
         return data
      } catch (err) {
         return rejectWithValue(err)
      }
   }
)

export const logoutRequest = createAsyncThunk(
   'auth/logoutRequest',
   // @ts-ignore
   async (_, { rejectWithValue }) => {
      try {
         const res = await fetch(baseUrl + 'auth/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 'token': getCookie('refreshToken') })
         })
         const data = await resCheck(res)
         return data
      } catch (err) {
         return rejectWithValue(err)
      }
   }
)

export const getUser = createAsyncThunk(
   'auth/getUser',
   // @ts-ignore
   async (_, { rejectWithValue }) => {
      try {
         if (getCookie('accessToken')) {
            const res = await fetch(baseUrl + 'auth/user', {
               method: 'GET',
               headers: {
                  'Content-Type': 'application/json',
                  'authorization': getCookie('accessToken')
               }
            })
            const data = await resCheck(res)
            return data
         } else {
            getToken()
            getUser()
         }
      } catch (err) {
         return rejectWithValue(err)
      }
   }
)

export const updateUser = createAsyncThunk(
   'auth/updateUser',
   // @ts-ignore
   async (form, { rejectWithValue }) => {
      try {
         if (getCookie('accessToken')) {
            const res = await fetch(baseUrl + 'auth/user', {
               method: 'PATCH',
               headers: {
                  'Content-Type': 'application/json',
                  'authorization': getCookie('accessToken')
               },
               body: JSON.stringify(form)
            })
            const data = await resCheck(res)
            return data
         } else {
            await getToken()
            await getUser()
         }
      } catch (err) {
         return rejectWithValue(err)
      }
   }
)

export const getToken = createAsyncThunk(
   'auth/getToken',
   // @ts-ignore
   async (_, { rejectWithValue }) => {
      try {
         const res = await fetch(baseUrl + 'auth/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 'token': getCookie('refreshToken') })
         })
         const data = await resCheck(res)
         return data
      } catch (err) {
         return rejectWithValue(err)
      }
   }
)
