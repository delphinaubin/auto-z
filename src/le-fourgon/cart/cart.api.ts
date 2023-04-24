import axios, { AxiosInstance } from "axios";
import { UserToken } from "../login/domain/user-token.vo";
import { Cart } from "./domain/cart.aggregate";
import { LeFourgonCartResponseToDomainMapper } from "./le-fourgon-cart-response-to-domain.mapper";
import { LeFourgonCartResponse } from "./le-fourgon-cart.response";
import { ProductId } from "../products/domain/product-id.vo";
import { ProductQuantity } from "../products/domain/product-quantity.vo";
import { Success } from "../domain/success.vo";
import { AbilityToValidate } from "./domain/ability-to-validate.vo";
import { LeFourgonSetProductCartQuantityResponse } from "./le-fourgon-set-product-cart-quantity.response";

export class CartApi {
  private axiosInstance: AxiosInstance;

  constructor(
    private readonly userToken: UserToken,
    private readonly mapper: LeFourgonCartResponseToDomainMapper
  ) {
    this.axiosInstance = axios.create({
      baseURL: "https://lefourgon.com/api",
      headers: {
        authorization: `Bearer ${userToken.accessToken.value}`,
      },
    });
  }

  async getCart(): Promise<Cart> {
    const { data: cartResponse } =
      await this.axiosInstance.get<LeFourgonCartResponse>("/user/cart");
    return this.mapper.toDomainCart(cartResponse);
  }

  async setProductQuantity(
    productId: ProductId,
    quantity: ProductQuantity
  ): Promise<{
    success: Success;
    isValidable: AbilityToValidate;
  }> {
    const { data: response } =
      await this.axiosInstance.post<LeFourgonSetProductCartQuantityResponse>(
        "/user/cart",
        {
          product_id: productId.value,
          quantity: quantity.value,
        }
      );

    return {
      success: Success.of(response.success),
      isValidable: AbilityToValidate.of(response.isValidable),
    };
  }
}
