import { Switch, Route, useLocation } from 'react-router-dom'
import styles from './profile.module.css'
import ProfileNavigation from '../../components/profile-nav/profile-nav'
import ProfileInfo from '../../components/profile-info/profile-info'
import ProfileOrders from '../../components/profile-feed/profile-feed'
import ModalOrder from '../modal-order/modal-order'
import { FC } from 'react'
import { TLocation } from '../../utils/types'

const Profile: FC = () => {
   
   const location = useLocation<TLocation>()
   const path: string = location.pathname
   const className: null | string = path === '/profile' || path === '/profile/orders' ? styles.main : null

   const status: string = 'profile'

   return (
      <div className={className}>
         <Switch>
            <Route path="/profile" exact>
               <ProfileNavigation />
               <ProfileInfo />
            </Route>
            <Route path="/profile/orders" exact>
               <ProfileNavigation />
               <ProfileOrders/>
            </Route>
            <Route path='/profile/orders/:id' exact>
               <ModalOrder status={status}/>
            </Route>
         </Switch>
      </div>
   )
}

export default Profile