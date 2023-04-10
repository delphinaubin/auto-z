import { Product } from "./product.vo";
import { PaginatedResult } from "./paginated-result.vo";
import { DomainObject } from "../../../shared/domain-object";

export class ProductsResult extends DomainObject<"ProductResults"> {
  readonly products: Product[];
  readonly pagination: PaginatedResult;

  constructor(products: Product[], pagination: PaginatedResult) {
    super();
    this.products = products;
    this.pagination = pagination;
  }
}
