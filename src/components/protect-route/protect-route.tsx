import { Route } from 'react-router-dom'
import { Redirect, useLocation } from 'react-router-dom'
import { authSelector } from '../../services/slices/auth-slice'
import { useSelector } from 'react-redux'
import { getCookie } from "../../utils/cookies";


const ProtectRoute = ({ children, ...rest }) => {

   const { auth } = useSelector(authSelector)
   const location = useLocation();
   return (
      <Route
         {...rest}
         render={() =>
            getCookie("accessToken") ? (
               children
            ) : (
               <Redirect to={{ pathname: "/login", state: { from: location } }} />
            )
         }
      />
   );
} 

export default ProtectRoute