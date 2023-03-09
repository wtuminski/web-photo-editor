import { useEffect, useState } from 'react';

import { Observable } from '~/Utils/observable';

export const useObservable = <T>(observable: Observable<T>): T => {
  const [value, setValue] = useState<T>(observable.get());

  useEffect(() => observable.subscribe(setValue), [observable]);

  return value;
};
