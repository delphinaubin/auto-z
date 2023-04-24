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
    if (limit > 100) {
      throw new Error(
        `Cannot create a pagination with a limit > 100 (${limit} was given)`
      );
    }
    this.limit = limit;
    this.offset = offset;
  }
}
