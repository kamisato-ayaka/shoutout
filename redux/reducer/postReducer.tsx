import * as actionType from "../strings";
import { PostVars } from "../../components/main/dashboard/types";

const postData = localStorage.getItem("post");
const initPost: PostVars[] = postData == null ? [] : JSON.parse(postData);

const reduce = (state: PostVars[] = initPost, action: any) => {
  switch (action.type) {
    case actionType.ADD_POST:
      return [...state, action.payload];
      
    default:
      return state;
  }
};

const postReducer = (state: PostVars[] = initPost, action: any) => {
  const newState: PostVars[] = reduce(state, action);
  localStorage.setItem("post", JSON.stringify(newState));
  return newState;
}

export default postReducer;
