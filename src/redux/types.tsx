import { UserVars } from "../components/signup/types";
import { PostVars } from "../components/main/dashboard/types";
import { UsernameVar } from "./actions";

export type AppState = {
    signupReducer: UserVars[];
    toSignupReducer: boolean;
    toLoginReducer: boolean;
    logUserReducer: string;
    postReducer: PostVars[];
    toUserProfileReducer: boolean;
    getUserReducer: UsernameVar;
    likePostReducer: string[];
  };