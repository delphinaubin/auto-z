import { AppConfig } from "./app.config";
import { LoginApi } from "./le-fourgon/login/login.api";
import { CartApi } from "./le-fourgon/cart/cart.api";
import { LeFourgonCartResponseToDomainMapper } from "./le-fourgon/cart/le-fourgon-cart-response-to-domain.mapper";
import { ProductId } from "./le-fourgon/products/domain/product-id.vo";
import { ProductQuantity } from "./le-fourgon/products/domain/product-quantity.vo";
import { LeFourgonProductsResponseToDomainMapper } from "./le-fourgon/products/le-fourgon-products-response-to-domain.mapper";
import { ProductsApi } from "./le-fourgon/products/products.api";
import { CategoryId } from "./le-fourgon/categories/domain/category-id.vo";
import { PaginationPage } from "./le-fourgon/products/domain/pagination-page.vo";

(async () => {
  const config = new AppConfig();
  const loginApi = new LoginApi();
  const accessToken = await loginApi.getAccessToken(
    config.leFourgonCredentials()
  );

  console.dir(accessToken, { depth: 1000 });

  // const categoriesApi = new CategoriesApi(accessToken);
  // const categories = await categoriesApi.getCategories();

  const productsApi = new ProductsApi(
    accessToken,
    new LeFourgonProductsResponseToDomainMapper()
  );

  const products = await productsApi.getProducts(
    new PaginationPage({
      offset: 0,
      limit: 500,
    })
  );

  console.dir({ products }, { depth: 1000 });

  // const cartApi = new CartApi(
  //   accessToken,
  //   new LeFourgonCartResponseToDomainMapper()
  // );
  // // const cart = await cartApi.getCart();
  //
  // const jupilerId = ProductId.of(86);
  // const response = await cartApi.setProductQuantity(
  //   jupilerId,
  //   ProductQuantity.of(2)
  // );
  // console.dir(response, { depth: 1000 });
})();
