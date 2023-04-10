import { AppConfig } from "./app.config";
import { LoginApi } from "./le-fourgon/login/login.api";
import { ProductsApi } from "./le-fourgon/products/products.api";
import { LeFourgonProductsResponseToDomainMapper } from "./le-fourgon/products/le-fourgon-products-response-to-domain.mapper";
import { PaginationPage } from "./le-fourgon/products/domain/pagination-page.vo";

(async () => {
  const config = new AppConfig();
  const loginApi = new LoginApi();
  const accessToken = await loginApi.getAccessToken(
    config.leFourgonCredentials()
  );

  // const categoriesApi = new CategoriesApi(accessToken);
  // const categories = await categoriesApi.getCategories();

  const productsApi = new ProductsApi(
    accessToken,
    new LeFourgonProductsResponseToDomainMapper()
  );

  const products = await productsApi.getProducts(
    new PaginationPage({
      offset: 0,
      limit: 20,
    })
  );

  console.dir(products, { depth: 1000 });
})();
