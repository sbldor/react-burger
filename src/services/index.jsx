import { combineReducers } from 'redux'

import { ingredientsReducer } from './slices/ingredients-slice'

const rootReducer = combineReducers({
   ingredients: ingredientsReducer
})

export default rootReducer