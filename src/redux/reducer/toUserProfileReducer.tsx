import * as actionType from '../strings'

const toUserProfileReducer = (state = false, action: any) => {
    switch (action.type) {
        case actionType.TO_USER_PROFILE:
            return !state;
            
        default:
            return state;
    }
};

export default toUserProfileReducer