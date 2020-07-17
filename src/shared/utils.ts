import { capitalize } from 'lodash';

export function mapAsync<T, U>(
  array: T[],
  callbackfn: (value: T, index: number, array: T[]) => Promise<U>
): Promise<U[]> {
  return Promise.all(array.map(callbackfn));
}

/** Filter array list async. and returns new filtered array */
export async function filterAsync<T>(
  array: T[],
  callbackfn: (value: T, index: number, array: T[]) => Promise<boolean>
): Promise<T[]> {
  const filterMap = await mapAsync(array, callbackfn);
  return array.filter((value, index) => filterMap[index]);
}

/** Returns category following this pattern {category}_name.jpg */
export const getCategoryFromFileName = (fileName: string) => {
  // Validates that file name starts with word followed by underscore
  // if so, wrap the word in regex group
  const categoryRegex = /^(\w+)_{1}.*$/;
  const match = fileName.match(categoryRegex);
  return match ? capitalize(match[1]) : '';
};
