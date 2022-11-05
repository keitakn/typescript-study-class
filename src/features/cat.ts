type CatId = number;

type CatName = string;

// https://u-ful.com/12448 のページから一部拝借
type CatBreed = 'ScottishFold' | 'Persian' | 'Bengal' | 'Munchkin';

type Cat = {
  id: CatId;
  name: CatName;
  breed: CatBreed;
};

const cats = [
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
