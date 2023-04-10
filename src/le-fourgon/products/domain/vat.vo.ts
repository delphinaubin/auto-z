import { ValueObject } from "../../../shared/value-object";

export class Vat extends ValueObject<number, "Vat"> {
  static NO_VAT = new Vat(0);
  static STANDARD = new Vat(0.2);
}
