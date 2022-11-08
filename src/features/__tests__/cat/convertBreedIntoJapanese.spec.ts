import { convertBreedIntoJapanese } from '../../cat';

describe('src/features/cat.ts convertBreedIntoJapanese TestCases', () => {
  const table = [
    ['ScottishFold', 'スコティッシュフォールド'],
    ['Persian', 'ペルシャ猫'],
    ['Bengal', 'ベンガル'],
    ['Munchkin', 'マンチカン'],
  ] as const;

  it.each(table)(
    'should return the japanese breed. params: %s',
    (request, expected) => {
      const result = convertBreedIntoJapanese(request);

      expect(result).toStrictEqual(expected);
    }
  );
});
