import { CleanUpFunction } from './types';

interface Subscriber<T> {
  (value: T): void;
}

export interface Observable<T> {
  get: () => T;
  set: (newValue: T) => void;
  subscribe: (subscriber: Subscriber<T>) => CleanUpFunction;
}

export const createObservable = <T>(initialValue: T): Observable<T> => {
  let value = initialValue;
  const subscribers = new Set<Subscriber<T>>();

  return {
    get: () => value,
    set: newValue => {
      value = newValue;
      subscribers.forEach(subscriber => subscriber(value));
    },
    subscribe: subscriber => {
      subscribers.add(subscriber);
      return () => subscribers.delete(subscriber);
    },
  };
};
