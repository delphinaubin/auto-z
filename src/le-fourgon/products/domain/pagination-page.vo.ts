import { DomainObject } from "../../../shared/domain-object";

interface PaginationPageConstructorParams {
  limit: number;
  offset: number;
}

export class PaginationPage extends DomainObject<"PaginationPage"> {
  readonly limit: number;
  readonly offset: number;

  constructor({ limit, offset }: PaginationPageConstructorParams) {
    super();
    this.limit = limit;
    this.offset = offset;
  }
}
