import * as actionType from "../strings";

const initUsername: string = ''

const logUserReducer = (state: string = initUsername, action: any) => {
  switch (action.type) {
    case actionType.LOG_USER:
      return action.payload;

    default:
      return state;
  }
};

export default logUserReducer;
