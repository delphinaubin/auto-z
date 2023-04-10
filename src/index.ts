import { AppConfig } from "./app.config";
import { LoginApi } from "./le-fourgon/login/login.api";
import { ProductsApi } from "./le-fourgon/products/products.api";
import { LeFourgonProductsResponseToDomainMapper } from "./le-fourgon/products/le-fourgon-products-response-to-domain.mapper";
import { PaginationPage } from "./le-fourgon/products/domain/pagination-page.vo";
import { CategoryId } from "./le-fourgon/categories/domain/category-id.vo";

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

  const beerCategoryId = CategoryId.of(1);
  const products = await productsApi.getProductsByCategory(
    beerCategoryId,
    new PaginationPage({
      offset: 0,
      limit: 5,
    })
  );

  console.dir(products, { depth: 1000 });
})();
