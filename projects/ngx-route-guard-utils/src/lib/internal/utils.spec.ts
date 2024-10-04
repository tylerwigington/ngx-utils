import { isPromise, wrapIntoObservable } from './utils';
import { EMPTY, firstValueFrom, Observable, of } from 'rxjs';

describe('InternalUtils', () => {
  it('isPromise should return true for promise', () => {
    expect(isPromise(Promise.resolve(true))).toBeTrue();
  });

  it('isPromise should return false for anything other than promise', () => {
    expect(isPromise({})).toBeFalse();
  });

  it('wrapIntoObservable should return EMPTY for null value', () => {
    expect(wrapIntoObservable(null)).toEqual(EMPTY);
  });

  it('wrapIntoObservable should return Observable<boolean> for Promise<boolean> value', async () => {
    const type = wrapIntoObservable(Promise.resolve(true));
    expect(type).toBeInstanceOf(Observable);
    const value = await firstValueFrom(type);
    expect(value).toBe(true);
  });

  it('wrapIntoObservable should return Observable<boolean> for boolean value', async () => {
    const type = wrapIntoObservable(true);
    expect(type).toBeInstanceOf(Observable);
    const value = await firstValueFrom(type);
    expect(value).toBe(true);
  });

  it('wrapIntoObservable should return original for Observable<boolean> value', async () => {
    const val = of(true);
    expect(wrapIntoObservable(val)).toEqual(val);
  });
});
