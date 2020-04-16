import * as actionType from '../strings'

const toLoginReducer = (state = true, action: any) => {
    switch (action.type) {
        case actionType.TO_LOGIN:
            return !state;
            
        default:
            return state;
    }
};

export default toLoginReducer