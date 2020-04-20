import { PostVars } from "../main/dashboard/types";

export type PostCommentVars = {
    post: PostVars
}

export type CommentVars = {
    postID: number
    usernameComment: string | ''
    comment: string | ''
};