import { ValueObject } from "../../shared/value-object";

export class Success extends ValueObject<boolean, "Success"> {
  static readonly SUCCESS = new Success(true);
  static readonly FAILURE = new Success(false);

  constructor(value: boolean) {
    super(value);
    if (value) {
      return Success.SUCCESS;
    }
    return Success.FAILURE;
  }
}
