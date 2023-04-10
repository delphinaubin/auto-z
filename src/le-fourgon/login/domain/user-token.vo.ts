import { AccessToken } from "./access-token.vo";
import { RefreshToken } from "./refresh-token.vo";
import { DomainObject } from "../../../shared/domain-object";

export class UserToken extends DomainObject<"UserToken"> {
  constructor(
    public readonly accessToken: AccessToken,
    public readonly refreshToken: RefreshToken
  ) {
    super();
  }
}
