import * as env from "env-var";
import { UserCredentials } from "./le-fourgon/login/domain/user-credentials.vo";
import { Username } from "./le-fourgon/login/domain/username.vo";
import { Password } from "./le-fourgon/login/domain/password.vo";

export class AppConfig {
  leFourgonCredentials(): UserCredentials {
    const username = env.get("LE_FOURGON_USERNAME").required().asString();
    const password = env.get("LE_FOURGON_PASSWORD").required().asString();
    return new UserCredentials(Username.of(username), Password.of(password));
  }
}
