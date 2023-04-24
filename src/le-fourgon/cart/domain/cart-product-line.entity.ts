import { DomainObject } from "../../../shared/domain-object";
import { ProductQuantity } from "../../products/domain/product-quantity.vo";
import { Amount } from "../../products/domain/amount.vo";
import { CartProduct } from "./cart-product.vo";

interface CartProductLineConstructorParams {
  quantity: ProductQuantity;
  totalExludingVat: Amount;
  totalIncludingVat: Amount;
  totalDeposit: Amount;
  product: CartProduct;
}

export class CartProductLine extends DomainObject<"CartProductLine"> {
  quantity: ProductQuantity;
  totalExludingVat: Amount;
  totalIncludingVat: Amount;
  totalDeposit: Amount;
  product: CartProduct;

  constructor({
    quantity,
    totalExludingVat,
    totalIncludingVat,
    totalDeposit,
    product,
  }: CartProductLineConstructorParams) {
    super();
    this.quantity = quantity;
    this.totalExludingVat = totalExludingVat;
    this.totalIncludingVat = totalIncludingVat;
    this.totalDeposit = totalDeposit;
    this.product = product;
  }
}
