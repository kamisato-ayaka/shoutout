import { combineReducers } from "redux";
import signupReducer from './signupReducer'
import toSignupReducer from './toSignupReducer'
import toLoginReducer from './toLoginReducer'
import postReducer from './postReducer'
import toUserProfileReducer from './toUserProfileReducer'
import getUserReducer from './getUserReducer'
import followUserReducer from './followUserReducer'
import likePostReducer from './likePostReducer'

const reducer = combineReducers({
    signupReducer,
    toSignupReducer,
    toLoginReducer,
    postReducer,
    toUserProfileReducer,
    getUserReducer,
    followUserReducer,
    likePostReducer
})

export default reducer