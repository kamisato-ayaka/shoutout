import { UserVars } from "../components/signup/types";
import { PostVars } from "../components/main/dashboard/types";
import { UsernameVar } from "./actions";
import { FollowVars } from "../components/user-profile/types";

export type AppState = {
    signupReducer: UserVars[];
    toSignupReducer: boolean;
    toLoginReducer: boolean;
    postReducer: PostVars[];
    toUserProfileReducer: boolean;
    getUserReducer: UsernameVar;
    followUserReducer: FollowVars[];
    likePostReducer: string[];
  };