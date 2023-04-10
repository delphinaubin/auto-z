import axios, { AxiosInstance } from "axios";
import { UserToken } from "../login/domain/user-token.vo";
import { Category } from "./domain/category.vo";
import { LeFourgonCategoriesResponse } from "./le-fourgon-categories.response";
import { CategoryId } from "./domain/category-id.vo";
import { Name } from "../domain/name.vo";
import { Description } from "../domain/description.vo";
import { ImageUrl } from "../domain/image-url.vo";

export class CategoriesApi {
  private axiosInstance: AxiosInstance;

  constructor(readonly userToken: UserToken) {
    this.axiosInstance = axios.create({
      baseURL: "https://lefourgon.com/api",
      headers: {
        authorization: `Bearer ${userToken.accessToken}`,
      },
    });
  }

  async getCategories(): Promise<Category[]> {
    const { data: categoriesResponse } =
      await this.axiosInstance.get<LeFourgonCategoriesResponse>("/categories");

    return categoriesResponse.map((categoryResponse) => {
      return new Category({
        id: CategoryId.of(categoryResponse.id),
        name: Name.of(categoryResponse.name),
        description: Description.of(categoryResponse.description),
        icon: ImageUrl.of(categoryResponse.icon),
        image: ImageUrl.of(categoryResponse.image),
      });
    });
  }
}
