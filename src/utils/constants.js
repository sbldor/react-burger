import { formatRelative } from "date-fns";
import { ru } from "date-fns/locale";

export const getData = (date) => {
   const dateRelative = formatRelative(new Date(date), new Date(), {
      locale: ru,
   });
   if (date) return dateRelative.split(" в ").join(", ") + " i-GMT+3";
};


export const getStatusOrder = status => {
   switch (status) {
      case 'done':
         return 'Выполнен'
      case 'pending':
         return 'Готовится';
      case 'created':
         return 'Создан';
      default:
         return status;
   }
}