import { DomainObject } from "../../../shared/domain-object";
import { ProductPackaging } from "../../products/domain/product-packaging.vo";
import { ProductQuantity } from "../../products/domain/product-quantity.vo";
import { PackageQuantity } from "./package-quantity.vo";
import { CartProductLine } from "./cart-product-line.entity";

interface CartPackagingWithProductsConstructorParams {
  packaging: ProductPackaging;
  nbProducts: ProductQuantity;
  nbPackages: PackageQuantity;
  nbSpaceLeft: ProductQuantity;
  productLines: CartProductLine[];
}

export class CartPackagingWithProducts extends DomainObject<"CartPackagingWithProducts"> {
  readonly packaging: ProductPackaging;
  readonly nbProducts: ProductQuantity;
  readonly nbPackages: PackageQuantity;
  readonly nbSpaceLeft: ProductQuantity;
  readonly productLines: CartProductLine[];

  constructor({
    packaging,
    nbProducts,
    nbPackages,
    nbSpaceLeft,
    productLines,
  }: CartPackagingWithProductsConstructorParams) {
    super();
    this.packaging = packaging;
    this.nbProducts = nbProducts;
    this.nbPackages = nbPackages;
    this.nbSpaceLeft = nbSpaceLeft;
    this.productLines = productLines;
  }
}
