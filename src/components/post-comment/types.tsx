import { PostVars } from "../main/dashboard/types";

export type PostCommentVars = {
    showComment: boolean,
    post: PostVars
}

export type CommentVars = {
    postID: number
    usernameComment: string | ''
    comment: string | ''
};