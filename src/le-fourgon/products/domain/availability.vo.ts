import { ValueObject } from "../../../shared/value-object";

export class Availability extends ValueObject<boolean, "Availability"> {
  static IS_AVAILABLE = new Availability(true);
  static IS_NOT_AVAILABLE = new Availability(false);

  constructor(value: boolean) {
    super(value);
    if (value) {
      return Availability.IS_AVAILABLE;
    }
    return Availability.IS_NOT_AVAILABLE;
  }
}
