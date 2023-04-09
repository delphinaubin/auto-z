import * as env from "env-var";
import { UserCredentials } from "./le-fourgon/login-api/user-credentials";

export class AppConfig {
  leFourgonCredentials(): UserCredentials {
    const username = env.get("LE_FOURGON_USERNAME").required().asString();
    const password = env.get("LE_FOURGON_PASSWORD").required().asString();
    return new UserCredentials(username, password);
  }
}
