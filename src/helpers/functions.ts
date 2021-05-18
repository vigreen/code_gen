import { WithCode } from '../types/type';
import { defaultPattern } from './constants';

const getChar = (row: string) => row.charAt(Math.floor(Math.random() * row.length));

const mapPattern = (char: string) => {
  const Upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const Lower = 'abcdefghijklmnopqrstuvwxyz';
  const Nums = '0123456789';
  const characters = Upper + Lower + Nums;
  switch (char) {
    case "C": return getChar(Upper);
    case "c": return getChar(Lower);
    case 'A': return getChar(Upper + Nums);
    case 'a': return getChar(Lower + Nums);
    case '9': return getChar(Nums);
    case 'x':
    case 'X': return getChar(characters);
  
    default: return char;
  }
}

export const createCode = (pattern = defaultPattern) => pattern.split('').map(mapPattern).join('');

export const generateCode = (length: number, pattern: string) => {
  const keys: WithCode = {};
  let iteration = 0;

  while(Object.keys(keys).length < length) {
    const code = createCode(pattern);
    keys[code] = true;
    iteration++;

    if (iteration / 2 > length) {
      break;
    }
  }

  if (iteration / 2 > length) {
    return null;
  }

  if (Object.keys(keys).length) {
    return Object.keys(keys).map((key) => [key]);
  }

  return null;
}

export const ifElse = (cond: boolean, trueFn: Function, falseFn: Function) => cond === true ? trueFn() : falseFn();
export const F = () => false;