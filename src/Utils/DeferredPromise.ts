export class DeferredPromise<T> extends Promise<T> {
  name: string = 'DeferredPromise';

  public resolve: (resolveValue: T) => void;
  public reject: (rejectValue: any) => void;

  constructor() {
    let decoupledResolve: (resolveValue: T) => void;
    let decoupledReject: (rejectValue: any) => void;
    super((resolve, reject) => {
      decoupledResolve = resolve;
      decoupledReject = reject;
    });
    /* eslint-disable immutable/no-mutation */
    this.resolve = decoupledResolve!;
    this.reject = decoupledReject!;
    /* eslint-enable immutable/no-mutation */
  }

  static get [Symbol.species]() {
    return Promise;
  }

  get [Symbol.toStringTag]() {
    return this.name;
  }
}
