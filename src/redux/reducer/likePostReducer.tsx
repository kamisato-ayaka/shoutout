import * as actionType from "../strings";

const likeData = localStorage.getItem("like");
const initLike: string[] = likeData == null ? [] : JSON.parse(likeData);

const reduce = (state: string[] = initLike, action: any) => {
  let val:string = action.payload
  switch (action.type) {
    case actionType.LIKE_POST:
      return [...state, val];

    default:
      return state;
  }
};

const likePostReducer = (state: string[] = initLike, action: any) => {
  const newState: string[] = reduce(state, action);
  localStorage.setItem("like", JSON.stringify(newState));
  return newState;
}

export default likePostReducer;
