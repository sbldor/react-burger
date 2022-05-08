export const baseUrl = 'https://norma.nomoreparties.space/api/';
export const wsUrl = "wss://norma.nomoreparties.space/orders";
export const resCheck = (res: { ok: boolean, json(): Promise<any>, status: number }) => {
   if (res.ok) {
      return res.json();
   } else {
      return Promise.reject(`Что-то пошло не так( Ошибка: ${res.status}`)
   }
}