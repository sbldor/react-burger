import { combineReducers } from 'redux'

import { ingredientsReducer } from './slices/ingredients-slice'
import { authReducer } from './slices/auth-slice'

const rootReducer = combineReducers({
   ingredients: ingredientsReducer,
   auth: authReducer
})

export default rootReducer