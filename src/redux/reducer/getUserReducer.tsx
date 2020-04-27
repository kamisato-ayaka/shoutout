import * as actionType from "../strings";
import { UsernameVar } from "../actions";

const usernameData = localStorage.getItem("getuser");
const initUsername: UsernameVar = usernameData == null ? '' : JSON.parse(usernameData);

const reduce = (state: UsernameVar = initUsername, action: any) => {
  switch (action.type) {
    case actionType.GET_USER:
      return action.payload;

    case actionType.RESET_USER:
      return '';

    default:
      return state;
  }
};

const getUserReducer = (state: UsernameVar = initUsername, action: any) => {
  const newState: UsernameVar = reduce(state, action);
  localStorage.setItem("getuser", JSON.stringify(newState));
  return newState;
}

export default getUserReducer;
