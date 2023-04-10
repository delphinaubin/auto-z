import { AppConfig } from "./app.config";
import { LoginApi } from "./le-fourgon/login/login.api";
import { CategoriesApi } from "./le-fourgon/categories/categories.api";

(async () => {
  const config = new AppConfig();
  const loginApi = new LoginApi();
  const accessToken = await loginApi.getAccessToken(
    config.leFourgonCredentials()
  );

  const categoriesApi = new CategoriesApi(accessToken);
  const categories = await categoriesApi.getCategories();

  console.dir(categories, { depth: 1000 });
})();
