import { User } from "./user.model";

export interface Account
{
  user: User;
  token?: string;
}
