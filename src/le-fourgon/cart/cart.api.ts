import axios, { AxiosInstance } from "axios";
import { UserToken } from "../login/domain/user-token.vo";
import { Cart } from "./domain/cart.aggregate";
import { LeFourgonCartResponseToDomainMapper } from "./le-fourgon-cart-response-to-domain.mapper";
import { LeFourgonCartResponse } from "./le-fourgon-cart.response";

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
}
