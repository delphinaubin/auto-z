import { UserCredentials } from "./user-credentials";
import { UserToken } from "./user-token";
import axios from "axios";
import { LeFourgonLoginResponse } from "./login.response";
import { BadCredentialsError } from "./bad-credentials.error";

export class LoginApi {
  async getAccessToken(credentials: UserCredentials): Promise<UserToken> {
    const { data, status } = await axios.post<LeFourgonLoginResponse>(
      "https://lefourgon.com/api/login_check",
      {
        username: credentials.username,
        password: credentials.password,
      },
      {
        validateStatus: (status) => [200, 401].includes(status),
      }
    );

    if (status === 401) {
      throw new BadCredentialsError();
    }

    return new UserToken(data.token, data.refresh_token);
  }
}
