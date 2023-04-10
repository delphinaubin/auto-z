import { Username } from "./username.vo";
import { Password } from "./password.vo";
import { DomainObject } from "../../../shared/domain-object";

export class UserCredentials extends DomainObject<"UserCredentials"> {
  constructor(
    public readonly username: Username,
    public readonly password: Password
  ) {
    super();
  }
}
