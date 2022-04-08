export const API_BURGERS = 'https://norma.nomoreparties.space/api/';
export const API_AUTH = 'https://norma.nomoreparties.space/api/auth/';
export const API_RESET = 'https://norma.nomoreparties.space/api/password-reset/';

export const resCheck = (res) => {
   if (res.ok) {
      return res.json();
   } else {
      return Promise.reject(`Что-то пошло не так( Ошибка: ${res.status}`)
   }
}