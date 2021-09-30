import { fermat } from './fermat';

export const getRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const generatePublicKey = (from: number, to: number): number => {
  const number = getRandomInt(from, to);

  const primary = fermat(number, 4);

  if (primary) return number;

  return generatePublicKey(from, to);
};
