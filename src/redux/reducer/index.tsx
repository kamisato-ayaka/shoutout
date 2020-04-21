import { combineReducers } from "redux";

import signupReducer from './signupReducer'
import logUserReducer from './logUserReducer'
import postReducer from './postReducer'
import getUserReducer from './getUserReducer'

const reducer = combineReducers({
    signupReducer,
    logUserReducer,
    postReducer,
    getUserReducer,
})

export default reducer