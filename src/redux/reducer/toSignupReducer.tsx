import * as actionType from '../strings'

const toSignupReducer = (state = false, action: any) => {
    switch (action.type) {
        case actionType.TO_SIGNUP:
            return !state;

        default:
            return state;
    }
};

export default toSignupReducer