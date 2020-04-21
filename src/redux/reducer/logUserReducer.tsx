import * as actionType from "../strings";

const initUsername: string = ''
const userData = localStorage.getItem("userLog");
const initUser: string = userData == null ? '' : JSON.parse(userData);

const reduce = (state: string = initUsername, action: any) => {
  switch (action.type) {
    case actionType.LOGIN_USER:
      return action.payload;

      case actionType.LOGOUT_USER:
        return '';

    default:
      return state;
  }
};

const logUserReducer = (state: string = initUser, action: any) => {
  const newState: string = reduce(state, action);
  localStorage.setItem("userLog", JSON.stringify(newState));
  return newState;
}

export default logUserReducer;
