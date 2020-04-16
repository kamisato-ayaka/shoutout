import { combineReducers } from "redux";
import signupReducer from './signupReducer'
import toSignupReducer from './toSignupReducer'
import toLoginReducer from './toLoginReducer'
import postReducer from './postReducer'
import toUserProfileReducer from './toUserProfileReducer'
import getUserReducer from './getUserReducer'
import likePostReducer from './likePostReducer'

const reducer = combineReducers({
    signupReducer,
    toSignupReducer,
    toLoginReducer,
    postReducer,
    toUserProfileReducer,
    getUserReducer,
    likePostReducer
})

export default reducer