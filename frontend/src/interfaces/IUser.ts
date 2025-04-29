export default interface IUser {
  _id: string;
  email: string;
  username: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type RegisterInputType = Omit<
  IUser,
  "_id" | "createdAt" | "updatedAt"
> & {
  password: string;
};

export type LoginInputType = Omit<IUser, "_id" | "createdAt" | "updatedAt" | "username"> & {
  password: string;
};
