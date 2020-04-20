import * as actionType from "../strings";
import { PostVars, CommentVar } from "../../components/main/dashboard/types";

const postData = localStorage.getItem("post");
const initPost: PostVars[] = postData == null ? [
  { "id": 0, "username": "popo", "post": "Hi!", "comments": [], "likes": ["teffy", "ran"] },
  { "id": 1, "username": "teffy", "post": "It's been a while", "comments": [], "likes": ["popo"] }
] : JSON.parse(postData);

type LikeVars = {
  postID: number
  usernameLike: string | ''
};

type CommentVars = {
  postID: number
  usernameComment: string | ''
  comment: string | ''
};

const reduce = (state: PostVars[] = initPost, action: any) => {
  const postVal = action.payload as LikeVars
  const commentVal = action.payload as CommentVars

  switch (action.type) {
    case actionType.ADD_POST:
      return [...state, action.payload];

    case actionType.LIKE_POST:
      return state.filter((post) => {
        if (post.id === postVal.postID) {
          return post.likes = [...post.likes, postVal.usernameLike]
        }
        return true
      })

    case actionType.UNLIKE_POST:
      return state.filter((post) => {
        if (post.id === postVal.postID) {
          let postItem = [...post.likes]
          const unlikePost = postItem.filter((arc: string) => arc !== postVal.usernameLike)
          return post.likes = unlikePost
        }
        return true
      })

      case actionType.ADD_COMMENT:
        return state.filter((post) => {
          if (post.id === commentVal.postID) {
            const commentData = {
              username: commentVal.usernameComment,
              comment: commentVal.comment
            }
            return post.comments = [...post.comments, commentData]
          }
          return true
        })
  
      case actionType.REMOVE_COMMENT:
        return state.filter((post) => {
          if (post.id === commentVal.postID) {
            let postItem = [...post.comments]
            const commentData = {
              username: commentVal.usernameComment,
              comment: commentVal.comment
            }
            const unlikePost = postItem.filter((arc: CommentVar) => arc !== commentData)
            return post.comments = unlikePost
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
