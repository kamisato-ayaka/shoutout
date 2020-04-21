import * as actionType from './strings'
import { UserVars } from '../components/signup/types'
import { PostVars } from '../components/main/dashboard/types'

export type UsernameVar = string | ''

type FollowVars = {
    usernameToFollow: string
    usernameOnline: string | ''
};

type LikeVars = {
    postID: number
    usernameLike: string | ''
};

type CommentVars = {
    postID: number
    usernameComment: string | ''
    comment: string | ''
};

type CommentVar = {
    username: string | ''
    comment: string | ''
};

export const toSignup = () => {
    return {
        type: actionType.TO_SIGNUP
    }
}

export const toLogin = () => {
    return {
        type: actionType.TO_LOGIN
    }
}

export const logUser = (user: string) => {
    return {
        type: actionType.LOG_USER,
        payload: user
    }
}

export const addUser = (newUser: UserVars) => {
    return {
        type: actionType.ADD_USER,
        payload: newUser
    }
}

export const addPost = (newPost: PostVars) => {
    return {
        type: actionType.ADD_POST,
        payload: newPost
    }
}

export const toUserProfile = () => {
    return {
        type: actionType.TO_USER_PROFILE
    }
}

export const getUser = (user: UsernameVar) => {
    return {
        type: actionType.GET_USER,
        payload: user
    }
}

export const resetUser = () => {
    return {
        type: actionType.RESET_USER
    }
}

export const followUser = (followData: FollowVars) => {
    return {
        type: actionType.FOLLOW_USER,
        payload: followData
    }
}

export const unfollowUser = (unfollowData: FollowVars) => {
    return {
        type: actionType.UNFOLLOW_USER,
        payload: unfollowData
    }
}

export const likePost = (likePost: LikeVars) => {
    return {
        type: actionType.LIKE_POST,
        payload: likePost
    }
}

export const unlikePost = (unlikePost: LikeVars) => {
    return {
        type: actionType.UNLIKE_POST,
        payload: unlikePost
    }
}

export const addComment = (addComment: CommentVars) => {
    return {
        type: actionType.ADD_COMMENT,
        payload: addComment
    }
}

export const removeComment = (removeComment: CommentVar) => {
    return {
        type: actionType.REMOVE_COMMENT,
        payload: removeComment
    }
}