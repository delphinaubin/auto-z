import { DomainObject } from "../../../shared/domain-object";

interface ProductVolumeConstructorParams {
  quantity: number;
  unit: string;
}

export class ProductVolume extends DomainObject<"ProductVolume"> {
  readonly quantity: number;
  readonly unit: string;

  constructor({ quantity, unit }: ProductVolumeConstructorParams) {
    super();
    this.quantity = quantity;
    this.unit = unit;
  }
}
