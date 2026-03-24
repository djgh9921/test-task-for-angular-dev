import { flattenObject } from './block-builder.utils';

describe('flattenObject', () => {
  it('keeps only top-level primitive values', () => {
    expect(
      flattenObject({
        name: 'John',
        age: 30,
        city: 'New York',
        active: true,
        child: {
          name: 'Ioana',
        },
      }),
    ).toEqual({
      name: 'John',
      age: 30,
      city: 'New York',
      active: true,
    });
  });

  it('ignores arrays as nested structures', () => {
    expect(
      flattenObject({
        name: 'John',
        tags: ['a', 'b'],
      }),
    ).toEqual({
      name: 'John',
    });
  });
});
