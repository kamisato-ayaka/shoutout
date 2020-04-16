import * as actionType from './strings'
import { UserVars } from '../components/signup/types'
import { PostVars } from '../components/main/dashboard/types'
import { FollowVars } from '../components/user-profile/types'

export type UsernameVar =  string

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

export const followUser = (user: FollowVars) => {
    return {
        type: actionType.FOLLOW_USER,
        payload: user
    }
}

export const likePost = (user: string) => {
    return {
        type: actionType.LIKE_POST,
        payload: user
    }
}