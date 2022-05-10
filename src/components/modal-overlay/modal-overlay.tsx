import style from './modal-overlay.module.css';
import { FC } from 'react';

interface IModalOverlay {
   readonly onToggle: (_?: boolean) => void
}

const ModalOverlay: FC<IModalOverlay> = ({ onToggle }) => {
   return(
      <div className={style.overlay} onClick={() => {onToggle(false)}}></div>
   )
}

export default ModalOverlay