import { DomainObject } from "../../../shared/domain-object";
import { AbilityToValidate } from "./ability-to-validate.vo";
import { CartPackagingWithProducts } from "./cart-packaging-with-products.vo";
import { CartResume } from "./cart-resume";

interface CartConstructorParams {
  abilityToValidate: AbilityToValidate;
  packagingWithProducts: CartPackagingWithProducts[];
  resume: CartResume;
}

export class Cart extends DomainObject<"Cart"> {
  readonly abilityToValidate: AbilityToValidate;
  readonly packagingWithProducts: CartPackagingWithProducts[];
  readonly resume: CartResume;

  constructor({
    abilityToValidate,
    packagingWithProducts,
    resume,
  }: CartConstructorParams) {
    super();
    this.abilityToValidate = abilityToValidate;
    this.packagingWithProducts = packagingWithProducts;
    this.resume = resume;
  }
}
