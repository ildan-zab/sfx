declare global {
  interface IReactions {
    likes: number;
    dislikes: number;
    userLike: boolean;
    userDislike: boolean;
  }

  interface IPost {
    id: number;
    title: string;
    body: string;
    tags: string[];
    reactions: IReactions;
    views: number;
    userId: number;
    [key: string]: any;
  }
}

export { IReactions, IPost };
