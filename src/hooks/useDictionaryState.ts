import { useState } from 'react';

interface ObjectWithID {
  id: string;
}

type Dictionary<T extends ObjectWithID> = {
  [id: string]: T;
};

export const useDictionaryState = <T extends ObjectWithID>() => {
  const [dict, setDict] = useState<Dictionary<T>>({});

  const addOne = (obj: T) => {
    dict[obj.id] = obj;
    setDict(dict);
  };

  const addMany = (arrayObjs: T[]) => arrayObjs.forEach(addOne);

  const remove = (id: string) => {
    const copy = { ...dict };
    delete copy[id];
    setDict(copy);
  };

  const update = (obj: T) => {
    dict[obj.id] = obj;
    setDict(dict);
  };

  const getOne = (id) => dict[id];

  const getArray = () => Object.values(dict);

  const isEmpty = () => Object.keys(dict).length === 0;

  return { addOne, addMany, remove, update, getOne, getArray, isEmpty };
};
