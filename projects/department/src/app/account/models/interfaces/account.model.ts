import { User } from "./user.model";

export interface Account
{
  user: User;
  accessToken?: string;
  refreshToken?: string;
}
