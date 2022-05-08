export const baseUrl = 'https://norma.nomoreparties.space/api/';
export const wsUrl = "wss://norma.nomoreparties.space/orders";
export const resCheck = (res: Response) => {
   if (res.ok) {
      return res.json();
   } else {
      return Promise.reject(`Что-то пошло не так( Ошибка: ${res.status}`)
   }
}