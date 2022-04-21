import {UserId} from "../types/userId.type";

export default interface ITokenData {
  accessToken: string;
  refreshToken: string;
  userId: UserId
}
