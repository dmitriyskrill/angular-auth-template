import {UserId} from "../../users/userId.type";

export interface TokenDto {
  accessToken: string;
  refreshToken: string;
  userId: UserId
}
