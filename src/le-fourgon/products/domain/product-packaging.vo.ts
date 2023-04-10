import { DomainObject } from "../../../shared/domain-object";
import { Name } from "../../domain/name.vo";
import { ProductQuantity } from "./product-quantity.vo";
import { Price } from "./price.vo";
import { ProductPackagingId } from "./product-packaging-id.vo";

interface ProductPackagingConstructorParams {
  id: ProductPackagingId;
  name: Name;
  capacity: ProductQuantity;
  depositPrice: Price;
}

export class ProductPackaging extends DomainObject<"ProductPackaging"> {
  readonly id: ProductPackagingId;
  readonly name: Name;
  readonly capacity: ProductQuantity;
  readonly depositPrice: Price;

  constructor({
    id,
    name,
    capacity,
    depositPrice,
  }: ProductPackagingConstructorParams) {
    super();
    this.id = id;
    this.name = name;
    this.capacity = capacity;
    this.depositPrice = depositPrice;
  }
}
