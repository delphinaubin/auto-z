import { AppConfig } from "./app.config";
import { LoginApi } from "./le-fourgon/login-api/login.api";

(async () => {
  const config = new AppConfig();
  const loginApi = new LoginApi();
  const accessToken = await loginApi.getAccessToken(
    config.leFourgonCredentials()
  );
  console.dir(accessToken, { depth: 1000 });
})();
