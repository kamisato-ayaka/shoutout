import * as actionType from "../strings";

const usernameData = localStorage.getItem("loguser");
const initUsername: string = usernameData == null ? '' : JSON.parse(usernameData);

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

const logUserReducer = (state: string = initUsername, action: any) => {
  const newState: string = reduce(state, action);
  localStorage.setItem("loguser", JSON.stringify(newState));
  return newState;
}

export default logUserReducer;
