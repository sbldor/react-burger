import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import style from './modal.module.css';
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const Modal = (props) => {

   useEffect(()=>{
      const closePopupOnEsc = e => {
         if (e.key === 'Escape') {
            props.onToggle()
         }
      }
      document.addEventListener('keydown', closePopupOnEsc)
      return () => document.removeEventListener('keydown', closePopupOnEsc)
   },[])

   

   return createPortal (
      <>
         <ModalOverlay {...props} />
         <div className={`pt-10 pr-10 pb-15 pl-10 ${style.container}`}>
            <div className={style.close} onClick={() => props.onToggle()}>
               <CloseIcon type="primary"/>
            </div>
            {props.children}
         </div>
         
      </>
   , document.getElementById('modals')!)
}

Modal.propTypes = {
   onToggle: PropTypes.func.isRequired,
   children: PropTypes.node.isRequired
}

export default Modal