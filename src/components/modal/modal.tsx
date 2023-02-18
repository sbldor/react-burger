import { createPortal } from "react-dom";
import { useEffect, ReactNode } from "react";
import style from './modal.module.css';
import ModalOverlay from "../modal-overlay/modal-overlay";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC } from 'react';

interface IModal {
   onToggle: (_?: boolean) => void;
   children: ReactNode
}

const Modal: FC<IModal> = ({onToggle, children}) => {

   useEffect(()=>{
      const closePopupOnEsc = (e: KeyboardEvent) => {
         if (e.key === 'Escape') {
            onToggle()
         }
      }
      document.addEventListener('keydown', closePopupOnEsc)
      return () => document.removeEventListener('keydown', closePopupOnEsc)
   },[])

   

   return createPortal (
      <>
         <ModalOverlay onToggle={onToggle} />
         <div className={`pt-10 pr-10 pb-15 pl-10 ${style.container}`}>
            <div className={style.close} onClick={() => onToggle()}>
               <CloseIcon type="primary"/>
            </div>
            {children}
         </div>
         
      </>
   , document.getElementById('modals')!)
}

export default Modal