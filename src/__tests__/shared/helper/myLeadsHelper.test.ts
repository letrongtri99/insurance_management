import { checkRowImportant } from 'presentation/pages/myLeads/myLeadsHelper';

const countAdd1 = 1;
const countRemove1 = 1;

const countAdd2 = 1;
const countRemove2 = 0;

const countAdd3 = 0;
const countRemove3 = 1;

const countAdd4 = 0;
const countRemove4 = 0;

const DateResult1 = {
  addStar: false,
  removeStar: false,
};

const DateResult2 = {
  addStar: false,
  removeStar: true,
};

const DateResult3 = {
  addStar: true,
  removeStar: false,
};

const DateResult4 = {
  addStar: true,
  removeStar: true,
};

test('Check row Important Case1', () => {
  expect(checkRowImportant(countAdd1, countRemove1)).toEqual(DateResult1);
});

test('Check row Important Case2', () => {
  expect(checkRowImportant(countAdd2, countRemove2)).toEqual(DateResult2);
});

test('Check row Important Case3', () => {
  expect(checkRowImportant(countAdd3, countRemove3)).toEqual(DateResult3);
});

test('Check row Important Case4', () => {
  expect(checkRowImportant(countAdd4, countRemove4)).toEqual(DateResult4);
});
