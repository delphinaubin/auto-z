import { UserCredentials } from "./domain/user-credentials.vo";
import { UserToken } from "./domain/user-token.vo";
import axios from "axios";
import { LeFourgonLoginResponse } from "./login.response";
import { BadCredentialsError } from "./domain/bad-credentials.error";
import { AccessToken } from "./domain/access-token.vo";
import { RefreshToken } from "./domain/refresh-token.vo";

export class LoginApi {
  async getAccessToken(credentials: UserCredentials): Promise<UserToken> {
    const { data, status } = await axios.post<LeFourgonLoginResponse>(
      "https://lefourgon.com/api/login_check",
      {
        username: credentials.username.value,
        password: credentials.password.value,
      },
      {
        validateStatus: (status) => [200, 401].includes(status),
      }
    );

    if (status === 401) {
      throw new BadCredentialsError();
    }

    return new UserToken(
      AccessToken.of(data.token),
      RefreshToken.of(data.refresh_token)
    );
  }
}
