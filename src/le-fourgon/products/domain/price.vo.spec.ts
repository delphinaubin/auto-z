import { Price } from "./price.vo";
import { Vat } from "./vat.vo";
import { Amount } from "./amount.vo";

describe("amountWithVatIncluded", () => {
  it("computes the price with a standard VAT", () => {
    const price = new Price({
      vat: Vat.STANDARD,
      amountExcludingVat: Amount.of(10),
    });

    expect(price.amountIncludingVat).toStrictEqual(Amount.of(12));
  });

  it("computes the price with no VAT", () => {
    const price = new Price({
      vat: Vat.NO_VAT,
      amountExcludingVat: Amount.of(10),
    });

    expect(price.amountIncludingVat).toStrictEqual(Amount.of(10));
  });
});
