import * as actionType from "../strings";
import { UserVars } from "../../components/signup/types";

const userData = localStorage.getItem("user");
const initUser: UserVars[] = userData == null ? [] : JSON.parse(userData);

const reduce = (state: UserVars[] = initUser, action: any) => {
  switch (action.type) {
    case actionType.ADD_USER:
      console.log(state);
      return [...state, action.payload];
      
    default:
      return state;
  }
};

const signupReducer = (state: UserVars[] = initUser, action: any) => {
  const newState: UserVars[] = reduce(state, action);
  localStorage.setItem("user", JSON.stringify(newState));
  return newState;
}

export default signupReducer;
