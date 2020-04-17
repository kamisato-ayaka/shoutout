import * as actionType from "../strings";
import { UsernameVar } from "../actions";

const initUsername: UsernameVar = ''

const getUserReducer = (state: UsernameVar = initUsername, action: any) => {
  switch (action.type) {
    case actionType.GET_USER:
      return action.payload;

    case actionType.RESET_USER:
      return '';

    default:
      return state;
  }
};

export default getUserReducer;
