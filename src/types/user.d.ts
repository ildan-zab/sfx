declare global {
  interface IUser {
    id: number;
    username: string;
    fullName: string;
  }
}

export { IUser };
