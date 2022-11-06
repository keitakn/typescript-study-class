/* eslint-disable max-lines-per-function, max-statements, no-magic-numbers */
import { validateCat } from '../../cat';

describe('src/features/cat.ts validateCat TestCases', () => {
  const validationErrorTable = [
    [
      {
        // 最小値より小さい
        id: -1,
        // 最小値より小さい
        name: '',
        // 空文字
        breed: '',
      },
      [
        {
          name: 'id',
          reason: 'Number must be greater than or equal to 1',
        },
        {
          name: 'name',
          reason: 'String must contain at least 1 character(s)',
        },
        {
          name: 'breed',
          reason:
            "Invalid enum value. Expected 'ScottishFold' | 'Persian' | 'Bengal' | 'Munchkin', received ''",
        },
      ],
    ],
    [
      {
        // 最小値より大きい
        id: Number.MAX_SAFE_INTEGER + 1,
        // 最小値より大きい
        name: 'AAAAAAAAAAAAAAAAAAAAA',
        // 許可されていない文字列
        breed: 'dog',
      },
      [
        {
          name: 'id',
          reason: `Number must be less than or equal to ${Number.MAX_SAFE_INTEGER}`,
        },
        { name: 'name', reason: 'String must contain at most 20 character(s)' },
        {
          name: 'breed',
          reason:
            "Invalid enum value. Expected 'ScottishFold' | 'Persian' | 'Bengal' | 'Munchkin', received 'dog'",
        },
      ],
    ],
  ];

  it.each(validationErrorTable)(
    'should return a validation error. params: %s',
    (request, expected) => {
      const result = validateCat(request);

      expect(result.isValidate).toBeFalsy();
      expect(result.invalidParams).toStrictEqual(expected);
    }
  );

  const passValidationTable = [
    [
      {
        // 最小値ギリギリ
        id: 1,
        // 最小値ギリギリ
        name: 'C',
        //
        breed: 'ScottishFold',
      },
    ],
    [
      {
        // 最大値ギリギリ
        id: Number.MAX_SAFE_INTEGER,
        // 最大値ギリギリ
        name: 'CCCCCCCCCCCCCCCCCCCC',
        //
        breed: 'Persian',
      },
    ],
  ];

  it.each(passValidationTable)(
    'should not be a validation error. params: %s',
    (request) => {
      const expected = { isValidate: true };

      expect(validateCat(request)).toStrictEqual(expected);
    }
  );
});
