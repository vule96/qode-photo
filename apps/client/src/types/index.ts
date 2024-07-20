export type UserType = {
  id: string;
  email: string;
};

export type LoginResponse = {
  user: UserType;
  accessToken: string;
  accessTokenExpires: number;
};

export type CommentType = {
  id: string;
  content: string;
  createdAt: string;
  user: UserType;
};
