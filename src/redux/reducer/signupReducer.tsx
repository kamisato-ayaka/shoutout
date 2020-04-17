import * as actionType from "../strings";
import { UserVars } from "../../components/signup/types";

const userData = localStorage.getItem("user");
const initUser: UserVars[] = userData == null ? [
  {"username":"teffy","password":"3dbe00a167653a1aaee01d93e77e730e","confirmpassword":"3dbe00a167653a1aaee01d93e77e730e","following":["popo"],"followers":["popo"]},
  {"username":"popo","password":"3dbe00a167653a1aaee01d93e77e730e","confirmpassword":"3dbe00a167653a1aaee01d93e77e730e","following":["teffy"],"followers":["teffy"]}
] : JSON.parse(userData);

type FollowVars = {
  usernameToFollow: string
  usernameOnline: string | ''
};

const reduce = (state: UserVars[] = initUser, action: any) => {
  const val = action.payload as FollowVars

  switch (action.type) {
    case actionType.ADD_USER:
      return [...state, action.payload];

    case actionType.FOLLOWING_USER:
      return state.filter((user) => {
        if (user.username === val.usernameOnline) {
          return user.following = [...user.following, val.usernameToFollow]

        } else if (user.username === val.usernameToFollow) {
          return user.followers = [...user.followers, val.usernameOnline]
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
