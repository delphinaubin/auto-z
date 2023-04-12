import { AppConfig } from "./app.config";
import { LoginApi } from "./le-fourgon/login/login.api";
import { CartApi } from "./le-fourgon/cart/cart.api";
import { LeFourgonCartResponseToDomainMapper } from "./le-fourgon/cart/le-fourgon-cart-response-to-domain.mapper";
import { ProductId } from "./le-fourgon/products/domain/product-id.vo";
import { ProductQuantity } from "./le-fourgon/products/domain/product-quantity.vo";

(async () => {
  const config = new AppConfig();
  const loginApi = new LoginApi();
  const accessToken = await loginApi.getAccessToken(
    config.leFourgonCredentials()
  );

  console.dir(accessToken, { depth: 1000 });

  // const categoriesApi = new CategoriesApi(accessToken);
  // const categories = await categoriesApi.getCategories();

  // const productsApi = new ProductsApi(
  //   accessToken,
  //   new LeFourgonProductsResponseToDomainMapper()
  // );
  //
  // const beerCategoryId = CategoryId.of(1);
  // const products = await productsApi.getProductsByCategory(
  //   beerCategoryId,
  //   new PaginationPage({
  //     offset: 0,
  //     limit: 5,
  //   })
  // );

  const cartApi = new CartApi(
    accessToken,
    new LeFourgonCartResponseToDomainMapper()
  );
  // const cart = await cartApi.getCart();

  const jupilerId = ProductId.of(86);
  const response = await cartApi.setProductQuantity(
    jupilerId,
    ProductQuantity.of(2)
  );
  console.dir(response, { depth: 1000 });
})();
