import { z } from 'zod';
import { ExhaustiveError } from './errors/ExhaustiveError';
import { validation, ValidationResult } from './validator';

type CatId = number;

type CatName = string;

// https://u-ful.com/12448 のページから一部拝借
const catBreedList = ['ScottishFold', 'Persian', 'Bengal', 'Munchkin'] as const;

type CatBreed = typeof catBreedList[number];

type Cat = {
  readonly id: CatId;
  readonly name: CatName;
  readonly breed: CatBreed;
};

const japaneseCatBreedList = [
  'スコティッシュフォールド',
  'ペルシャ猫',
  'ベンガル',
  'マンチカン',
] as const;

type JapaneseCatBreed = typeof japaneseCatBreedList[number];

export const convertBreedIntoJapanese = (
  catBreed: CatBreed
): JapaneseCatBreed => {
  switch (catBreed) {
    case 'ScottishFold':
      return 'スコティッシュフォールド';
    case 'Persian':
      return 'ペルシャ猫';
    case 'Bengal':
      return 'ベンガル';
    case 'Munchkin':
      return 'マンチカン';
    default:
      throw new ExhaustiveError(catBreed);
  }
};

const createCatRequestSchema = z.object({
  name: z.string().min(1).max(20),
  breed: z.enum(catBreedList),
});

type CreateCatRequest = z.infer<typeof createCatRequestSchema>;

const validateCatRequest = (params: unknown): ValidationResult => {
  return validation(createCatRequestSchema, params);
};

export const isCreateCatRequest = (
  value: unknown
): value is CreateCatRequest => {
  return validateCatRequest(value).isValidate;
};

const catSchema = z.object({
  id: z.number().min(1).max(Number.MAX_SAFE_INTEGER),
  name: z.string().min(1).max(20),
  breed: z.enum(catBreedList),
});

export const validateCat = (params: unknown): ValidationResult => {
  return validation(catSchema, params);
};

export const isCat = (value: unknown): value is Cat => {
  if (Object.prototype.toString.call(value) !== '[object Object]') {
    return false;
  }

  const validationResult = validateCat(value);

  return validationResult.isValidate;
};

const cats: Cat[] = [
  { id: 1, name: 'つくし', breed: 'ScottishFold' as const },
  { id: 2, name: 'モコ', breed: 'Persian' as const },
  { id: 3, name: 'オル', breed: 'Bengal' as const },
  { id: 4, name: 'プリン', breed: 'Munchkin' as const },
  { id: 5, name: 'メル', breed: 'Munchkin' as const },
];

export const findCat = (id: CatId): Cat => {
  const cat = cats.find((cat) => cat.id === id);
  if (cat != null) {
    return cat;
  }

  throw new Error('Cat is Not Found');
};
