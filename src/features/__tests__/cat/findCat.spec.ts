import { findCat } from '../../cat';

describe('src/features/cat.ts findCat TestCases', function () {
  it('should be possible to acquire one cat.', () => {
    const result = findCat(2);

    const expected = {
      id: 2,
      name: 'モコ',
      breed: 'Persian',
    };

    expect(result).toStrictEqual(expected);
  });

  it('should throw an Error, because the cat is not found.', () => {
    expect(() => {
      findCat(10);
    }).toThrow(/^Cat is Not Found$/);
  });
});
