import { Amount } from "../../products/domain/amount.vo";
import { DomainObject } from "../../../shared/domain-object";

interface CartResumeConstructorParams {
  totalProductsExcludingVat: Amount;
  totalProductsIncludingVat: Amount;
  totalDeposit: Amount;
  totalProductsWithDepositIncludingVat: Amount;
}

export class CartResume extends DomainObject<"CartResume"> {
  readonly totalProductsExcludingVat: Amount;
  readonly totalProductsIncludingVat: Amount;
  readonly totalDeposit: Amount;
  readonly totalProductsWithDepositIncludingVat: Amount;

  constructor({
    totalProductsExcludingVat,
    totalProductsIncludingVat,
    totalDeposit,
    totalProductsWithDepositIncludingVat,
  }: CartResumeConstructorParams) {
    super();
    this.totalProductsExcludingVat = totalProductsExcludingVat;
    this.totalProductsIncludingVat = totalProductsIncludingVat;
    this.totalDeposit = totalDeposit;
    this.totalProductsWithDepositIncludingVat =
      totalProductsWithDepositIncludingVat;
  }
}
