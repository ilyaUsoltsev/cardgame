import { pictureNames } from '../constants/constatns';

export const prepareCards = () =>
  [...pictureNames, ...pictureNames, ...pictureNames, ...pictureNames]
    .map((item) => ({ word: item, id: Math.random() }))
    .sort((a, b) => a.id - b.id);
