/* eslint-disable max-lines-per-function, max-statements, no-magic-numbers */
import { z } from 'zod';

import { ValidationError } from '../../errors/ValidationError';
import { validation, createSchemaFromType } from '../../validator';

describe('src/features/validator.ts validation TestCases', () => {
  type Email = string;

  type TestSchema = {
    count: number;
    email: Email;
    userName?: string;
    color?: 'pink' | 'red';
  };

  const allParamsTable = [
    [
      {
        count: -1,
        email: '',
        userName: '',
        color: 'unknown',
      },
      [
        { name: 'count', reason: 'Number must be greater than or equal to 1' },
        { name: 'email', reason: 'Invalid email' },
        {
          name: 'userName',
          reason: 'String must contain at least 1 character(s)',
        },
        { name: 'color', reason: 'Invalid input' },
      ],
    ],
  ];

  const testSchema = createSchemaFromType<TestSchema>()(
    z.object({
      count: z.number().min(1),
      email: z.string().email(),
      userName: z.string().min(1).optional(),
      color: z.union([z.literal('pink'), z.literal('red')]).optional(),
    })
  );

  it.each(allParamsTable)(
    'should return a validation error for all parameters. params: %s',
    (params, expected) => {
      const result = validation(testSchema, params);

      expect(result.isValidate).toBeFalsy();
      expect(result.invalidParams).toStrictEqual(expected);

      // ここから下は意味がないように見えるが、z.infer で型定義を生成出来る事を確認する意図で書いている
      type CreatedTestSchema = z.infer<typeof testSchema>;

      const sampleSchema: CreatedTestSchema = {
        count: 1,
        email: 'aa@aa',
        userName: '',
        color: 'pink',
      };

      expect(sampleSchema).toStrictEqual(sampleSchema);
    }
  );

  const requiredParamsTable = [
    [
      {
        count: -1,
        email: '',
      },
      [
        { name: 'count', reason: 'Number must be greater than or equal to 1' },
        { name: 'email', reason: 'Invalid email' },
      ],
    ],
  ];

  it.each(requiredParamsTable)(
    'should return a validation error for required parameters. params: %s',
    (params, expected) => {
      const result = validation(testSchema, params);

      expect(result.isValidate).toBeFalsy();
      expect(result.invalidParams).toStrictEqual(expected);
    }
  );

  it('should not be a validation error', () => {
    const params = {
      count: 10,
      email: 'kkk.kkk@exmple.com',
      userName: 'MyName',
      color: 'red',
    };

    const expected = { isValidate: true };

    expect(validation(testSchema, params)).toStrictEqual(expected);
  });

  it('should throw an ValidationError, because parse threw an error', () => {
    const mockSchema = {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      parse: (params: unknown) => {
        throw new Error('mockSchema error');
      },
    };

    const params = {
      count: 10,
      email: 'kkk.kkk@exmple.com',
      userName: 'MyName',
      color: 'red',
    };

    expect(() => validation(mockSchema, params)).toThrow(
      new ValidationError('mockSchema error')
    );
  });
});
