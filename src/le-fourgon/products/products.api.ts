import axios, { AxiosInstance } from "axios";
import { UserToken } from "../login/domain/user-token.vo";
import { ProductsResult } from "./domain/products-result.vo";
import { LeFourgonProductsResponse } from "./le-fourgon-products.response";
import { PaginationPage } from "./domain/pagination-page.vo";
import { LeFourgonProductsResponseToDomainMapper } from "./le-fourgon-products-response-to-domain.mapper";
import { CategoryId } from "../categories/domain/category-id.vo";
import { TextSearchQuery } from "./domain/text-search-query.vo";

export class ProductsApi {
  private axiosInstance: AxiosInstance;

  constructor(
    private readonly userToken: UserToken,
    private readonly mapper: LeFourgonProductsResponseToDomainMapper
  ) {
    this.axiosInstance = axios.create({
      baseURL: "https://lefourgon.com/api",
      headers: {
        authorization: `Bearer ${userToken.accessToken}`,
      },
    });
  }

  async getProducts(page: PaginationPage): Promise<ProductsResult> {
    const { data: productsResponse } =
      await this.axiosInstance.get<LeFourgonProductsResponse>("/products", {
        params: {
          limit: page.limit,
          offset: page.offset,
        },
      });
    return this.mapper.toDomainProductsResult(productsResponse);
  }

  async getProductsByCategory(
    categoryId: CategoryId,
    page: PaginationPage
  ): Promise<ProductsResult> {
    const { data: productsResponse } =
      await this.axiosInstance.get<LeFourgonProductsResponse>("/products", {
        params: {
          cat: categoryId.value,
          limit: page.limit,
          offset: page.offset,
        },
      });
    return this.mapper.toDomainProductsResult(productsResponse);
  }

  async searchProduct(
    searchQuery: TextSearchQuery,
    page: PaginationPage
  ): Promise<ProductsResult> {
    const { data: productsResponse } =
      await this.axiosInstance.get<LeFourgonProductsResponse>("/products", {
        params: {
          search: searchQuery.value,
          limit: page.limit,
          offset: page.offset,
        },
      });
    return this.mapper.toDomainProductsResult(productsResponse);
  }
}
