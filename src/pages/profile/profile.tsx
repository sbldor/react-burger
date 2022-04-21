import { Switch, Route } from 'react-router-dom'
import styles from './profile.module.css'
import ProfileNavigation from '../../components/profile-nav/profile-nav'
import ProfileInfo from '../../components/profile-info/profile-info'
import ProfileOrders from '../../components/profile-feed/profile-feed'

const Profile = () => {

   return (
      <div className={styles.main}>
         <ProfileNavigation />
         <Switch>
            <Route path="/profile" exact>
               <ProfileInfo />
            </Route>
            <Route path="/profile/orders" exact>
               <ProfileOrders/>
            </Route>
         </Switch>
      </div>
   )
}

export default Profile