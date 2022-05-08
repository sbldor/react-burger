import { Route, Redirect, useLocation, RouteProps } from 'react-router-dom'
import { getCookie } from "../../utils/cookies";
import { FC } from 'react';


const ProtectRoute: FC<RouteProps> = ({ children, ...rest }) => {

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