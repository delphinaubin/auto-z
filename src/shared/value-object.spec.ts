import { NullableValueObject, ValueObject } from './value-object';

class DummyValueObject extends ValueObject<string, 'dummy'> {}

interface DummyInterface {
  code: string;
}

class NullableInterfaceDummyValueObject extends NullableValueObject<
  DummyInterface,
  'dummy',
  'UNSET'
> {
  protected readonly nullValue = 'UNSET';
}

class NullableDummyValueObject extends NullableValueObject<
  string,
  'dummy',
  'UNSET'
> {
  protected readonly nullValue = 'UNSET';
}

class NullableBooleanDummyValueObject extends NullableValueObject<
  boolean,
  'dummy',
  'UNSET'
> {
  protected readonly nullValue = 'UNSET';
}

describe('ValueObject', () => {
  it('returns value', () => {
    const dummy = new DummyValueObject('dummy text');

    expect(dummy.value).toEqual('dummy text');
  });
});

describe('NullableValueObject', () => {
  it('returns value as string', () => {
    const dummy = new NullableDummyValueObject('dummy text');

    expect(dummy.value).toEqual('dummy text');
  });

  it('returns value as boolean', () => {
    const dummy = new NullableBooleanDummyValueObject(false);

    expect(dummy.value).toEqual(false);
  });

  it('returns false when not set', () => {
    const dummy = new NullableDummyValueObject('UNSET');

    expect(dummy.isSet()).toEqual(false);
  });

  it('returns true when set', () => {
    const dummy = new NullableDummyValueObject('is set');

    expect(dummy.isSet()).toEqual(true);
  });

  describe('getOr', () => {
    it('returns value when set', () => {
      const dummy = new NullableDummyValueObject('is set');

      expect(dummy.getOr(null)).toEqual('is set');
    });

    it('returns null value when not set', () => {
      const dummy = new NullableDummyValueObject('UNSET');

      expect(dummy.getOr(null)).toBeNull();
    });
  });

  describe('mapOr', () => {
    it('returns value mapped when set', () => {
      const obj = {
        code: '1',
      };
      const dummy = new NullableInterfaceDummyValueObject(obj);

      expect(dummy.mapOr(null, (o) => o.code + ' code')).toEqual('1 code');
    });

    it('returns null mapped when not set', () => {
      const dummy = new NullableInterfaceDummyValueObject('UNSET');

      expect(dummy.mapOr(null, (o) => o.code + ' code')).toBeNull();
    });
  });

  describe('unwrapArray', () => {
    it('returns unwrapped array of arrayValueObject', () => {
      const array = [
        new DummyValueObject('value1'),
        new DummyValueObject('value2'),
      ];

      expect(ValueObject.unwrapArray(array)).toEqual(['value1', 'value2']);
    });
  });
});
