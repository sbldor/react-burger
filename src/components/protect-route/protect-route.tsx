import { Route } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import { authSelector } from '../../services/slices/auth-slice'
import { useSelector } from 'react-redux'

const ProtectRoute = ({ children, ...rest }) => {

   const { auth } = useSelector(authSelector)

   return (
      <Route
         {...rest}
         render={({ location }) =>
            auth ? children : (<Redirect to={{ pathname: '/login', state: { from: location } }} />)
         }
      />
   )
} 

export default ProtectRoute