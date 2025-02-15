export type ILogin = {
  token: string;
  user: IUser;
};

export type IUser = {
  createdAt: string;
  email: string;
  id: number;
  name: string;
  password: string;
  role: string;
  status: boolean;
  updatedAt: string;
};
