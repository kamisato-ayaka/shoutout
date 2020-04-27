import * as actionType from "../strings";
import { UserVars } from "../../components/signup/types";

const userData = localStorage.getItem("user");
const initUser: UserVars[] = userData == null ? [] : JSON.parse(userData);

type FollowVars = {
  usernameToFollow: string
  usernameOnline: string | ''
};

const reduce = (state: UserVars[] = initUser, action: any) => {
  const val = action.payload as FollowVars

  switch (action.type) {
    case actionType.ADD_USER:
      let value = action.payload
      const newUser = {
        username: value.username,
        password: value.password,
        confirmpassword: value.confirmpassword,
        following: [value.username],
        followers: value.followers
      }
      return [...state, newUser];

    case actionType.FOLLOW_USER:
      return state.filter((user) => {
        if (user.username === val.usernameOnline) {
          return user.following = [...user.following, val.usernameToFollow]

        } else if (user.username === val.usernameToFollow) {
          return user.followers = [...user.followers, val.usernameOnline]
        }
        return true
      })

    case actionType.UNFOLLOW_USER:
      return state.filter((user) => {

        if (user.username === val.usernameOnline) {
          let unFollowing = [...user.following]
          const unfollowUser = unFollowing.filter((arc: string) => arc !== val.usernameToFollow)
          return user.following = unfollowUser

        } else if (user.username === val.usernameToFollow) {
          let unFollowers = [...user.followers]
          const unfollowUser = unFollowers.filter((arc: string) => arc !== val.usernameOnline)
          return user.followers = unfollowUser
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
