import style from './modal-overlay.module.css';
import PropTypes from 'prop-types';

const ModalOverlay = (props) => {
   return(
      <div className={style.overlay} onClick={() => {props.onToggle(false)}}></div>
   )
}

ModalOverlay.propTypes = {
   onToggle: PropTypes.func.isRequired
}

export default ModalOverlay