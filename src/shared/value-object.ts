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

export abstract class NullableValueObject<
  T,
  Type,
  NullType
> extends ValueObject<T | NullType, Type> {
  protected abstract readonly nullValue: NullType;

  isSet(): this is ValueObject<T, Type> {
    return this.value !== this.nullValue;
  }

  getOr<NullValue>(valueIfNotSet: NullValue): T | NullValue {
    if (this.isSet()) {
      return this.value;
    }

    return valueIfNotSet;
  }

  mapOr<NullValue, TTransformed>(
    valueIfNotSet: NullValue,
    transform: (value: T) => TTransformed
  ): TTransformed | NullValue {
    if (this.isSet()) {
      return transform(this.value);
    }

    return valueIfNotSet;
  }
}
