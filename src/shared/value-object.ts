import { DomainObject } from "./domain-object";

export abstract class ValueObject<T, Type> extends DomainObject<Type> {
  constructor(public readonly value: T) {
    super();
  }

  static unwrapArray<V>(
    valueObjectArray: ReadonlyArray<ValueObject<V, string>>
  ): V[] {
    return valueObjectArray.map((valueObject) => valueObject.value);
  }

  static of<V, FLAVORING, VO extends ValueObject<V, FLAVORING>>(
    this: new <VV extends V>(value: VV) => VO,
    value: V
  ): VO {
    return new this(value);
  }
}
