import { EMPTY, Observable, from, isObservable, of } from 'rxjs';

export const wrapIntoObservable = <T>(
  input: Promise<T> | Observable<T> | T
): Observable<T> => {
  if (input === null || input === undefined) {
    return EMPTY;
  }
  if (isPromise(input)) {
    return from(input);
  }
  if (isObservable(input)) {
    return input;
  }
  return of(input);
};

export const isPromise = (obj: any): obj is Promise<unknown> =>
  !!obj && obj instanceof Promise;
