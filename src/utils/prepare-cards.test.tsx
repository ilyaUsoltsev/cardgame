import React from 'react';
import { prepareCards } from './prepare-cards';

function getAllIndexes(arr: string[], value: string) {
  const indexes = [];
  let i = -1;
  while ((i = arr.indexOf(value, i + 1)) !== -1) {
    indexes.push(i);
  }
  return indexes;
}

test('should randomize 36 cards', () => {
  const suffledCards = prepareCards().map((item) => item.word);
  const suffledCardsTwo = prepareCards().map((item) => item.word);
  const indexesOfDog = getAllIndexes(suffledCards, 'dog');
  const indexesOfDogTwo = getAllIndexes(suffledCardsTwo, 'dog');
  expect(suffledCards.length).toBe(36);
  expect(indexesOfDog.toString()).not.toEqual(indexesOfDogTwo.toString());
});
