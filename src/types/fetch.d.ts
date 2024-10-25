declare global {
  interface IFetch {
    skip: number;
    limit: number;
    total: number;
  }

  interface IFetchPosts extends IFetch {
    posts: IPost[];
  }

  interface IFetchComments extends IFetch {
    comments: IComment[];
  }
}

export { IFetchPosts, IFetchComments };
