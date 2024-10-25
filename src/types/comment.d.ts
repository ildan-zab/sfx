declare global {
  interface IComment {
    id: number;
    body: string;
    postId: number;
    likes: number;
    user: IUser;
    isDeleted: boolean;
    [key: string]: any;
  }
}

export { IComment };
