import style from './error.module.css';
import PropTypes from 'prop-types'

const Err = ({error}) => {
   return (
      <p className={`text text_type_main-large mt-5 ${style.error}`}>{error}</p>
   )
}

Err.propTypes = {
   error: PropTypes.string
}

export default Err