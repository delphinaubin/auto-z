import { DomainObject } from "../../../shared/domain-object";
import { Amount } from "./amount.vo";
import { Vat } from "./vat.vo";

interface PriceConstructorParams {
  amountExcludingVat: Amount;
  vat: Vat;
}

export class Price extends DomainObject<"Price"> {
  amountExcludingVat: Amount;
  vat: Vat;
  constructor({ amountExcludingVat, vat }: PriceConstructorParams) {
    super();
    this.amountExcludingVat = amountExcludingVat;
    this.vat = vat;
  }

  get amountIncludingVat(): Amount {
    return Amount.of(this.amountExcludingVat.value * (1 + this.vat.value));
  }
}
