const save = <Key, Value>(cache: Map<Key, Value>, key: Key, value: Value): Value => {
  cache.set(key, value);
  return value;
};

export const memoize = <Arg, ReturnType>(func: (arg: Arg) => ReturnType) => {
  const cache = new Map<Arg, ReturnType>();
  return (arg: Arg) => cache.get(arg) ?? save(cache, arg, func(arg));
};
