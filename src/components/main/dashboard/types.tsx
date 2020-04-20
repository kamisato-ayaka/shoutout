export type PostVars = {
    id: number
    username: string 
    post: string
    comments: Array<CommentVar>
    likes: Array<string>
}

export type CommentVar = {
    username: string,
    comment: string | ''
}