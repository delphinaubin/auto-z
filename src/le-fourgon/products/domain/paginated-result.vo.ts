import { DomainObject } from "../../../shared/domain-object";

interface PaginatedConstructorParams {
  offset: number;
  limit: number;
  count: number;
}

export class PaginatedResult extends DomainObject<"PaginatedResult"> {
  readonly offset: number;
  readonly limit: number;
  readonly count: number;

  constructor({ offset, limit, count }: PaginatedConstructorParams) {
    super();
    this.offset = offset;
    this.limit = limit;
    this.count = count;
  }
}
