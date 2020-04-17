import * as actionType from "../strings";
import { PostVars } from "../../components/main/dashboard/types";

const postData = localStorage.getItem("post");
const initPost: PostVars[] = postData == null ? [
  { "id": 0, "username": "popo", "post": "Hi!", "comments": [], "likes": ["teffy"] },
  { "id": 1, "username": "teffy", "post": "It's been a while", "comments": [], "likes": ["popo"] }
] : JSON.parse(postData);

type LikeVars = {
  postID: number
  usernameLike: string | ''
};

const reduce = (state: PostVars[] = initPost, action: any) => {
  const val = action.payload as LikeVars
  switch (action.type) {
    case actionType.ADD_POST:
      return [...state, action.payload];

    case actionType.LIKE_POST:
      return state.filter((post) => {
        if (post.id === val.postID) {
          return post.likes = [...post.likes, val.usernameLike]
        }
        return true
      })

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
