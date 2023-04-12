import { ValueObject } from "../../../shared/value-object";

export class AbilityToValidate extends ValueObject<
  boolean,
  "AbilityToValidate"
> {
  static CAN_BE_VALIDATED = new AbilityToValidate(true);
  static CANNOT_BE_VALIDATED = new AbilityToValidate(false);

  constructor(value: boolean) {
    super(value);
    if (value) {
      return AbilityToValidate.CAN_BE_VALIDATED;
    }
    return AbilityToValidate.CANNOT_BE_VALIDATED;
  }
}
