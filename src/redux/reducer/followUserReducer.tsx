import * as actionType from "../strings";
import { FollowVars } from "../../components/user-profile/types";

const followData = localStorage.getItem("follow");
const initFollow: FollowVars[] = followData == null ? [] : JSON.parse(followData);

const reduce = (state: FollowVars[] = initFollow, action: any) => {
  let val = action.payload
  switch (action.type) {
    case actionType.FOLLOW_USER:
      return state.filter((user) => {
        if (user.username === val.username) {
          if (user.followuser.length === 0) {
            console.log('if');
            
            user.followuser = [val.followuser]
          } else {
            console.log('else');
            
            user.followuser = [...user.followuser, val.followuser]
          }
        }
        return true;
      })

    // return [...state, val]

    default:
      return state;
  }
};

const followUserReducer = (state: FollowVars[] = initFollow, action: any) => {
  const newState: FollowVars[] = reduce(state, action);
  localStorage.setItem("follow", JSON.stringify(newState));
  return newState;
}

export default followUserReducer;
