import { Switch, Route } from 'react-router-dom'
import styles from './profile.module.css'
import ProfileNavigation from '../../components/profile-nav/profile-nav'
import ProfileInfo from '../../components/profile-info/profile-info'

const Profile = () => {

   return (
      <div className={styles.main}>
         <ProfileNavigation />
         <Switch>
            <Route path="/profile" exact>
               <ProfileInfo />
            </Route>
            <Route path="/profile/orders" exact>
               <span className={'text_type_main-default mt-0'}>Ошибка...</span>
            </Route>
         </Switch>
      </div>
   )
}

export default Profile