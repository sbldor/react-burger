export const API_BURGERS = 'https://norma.nomoreparties.space/api/';

export const resCheck = (res) => {
   if (res.ok) {
      return res.json();
   } else {
      return Promise.reject(`Что-то пошло не так( Ошибка: ${res.status}`)
   }
}