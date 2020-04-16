import * as actionType from "../strings";
import { UserVars } from "../../components/signup/types";

const userData = localStorage.getItem("user");
const initUser: UserVars[] = userData == null ? [] : JSON.parse(userData);

const reduce = (state: UserVars[] = initUser, action: any) => {
  switch (action.type) {
    case actionType.ADD_USER:
      console.log(state);
      return [...state, action.payload];

    case actionType.FOLLOW_USER:
      type FollowVars = {
        usernameFollowed: string
        usernameToFollow: string
      };
      const val = action.payload as FollowVars
      return state.filter((user) => {
        if (user.username === val.usernameToFollow) {
          user.followers = [...user.followers, val.usernameFollowed]
        }
        return true
      })

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
