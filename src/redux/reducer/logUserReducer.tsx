import * as actionType from "../strings";

const initUsername: string = ''

const logUserReducer = (state: string = initUsername, action: any) => {
  switch (action.type) {
    case actionType.LOGIN_USER:
      return action.payload;

      case actionType.LOGOUT_USER:
        return '';

    default:
      return state;
  }
};

export default logUserReducer;
