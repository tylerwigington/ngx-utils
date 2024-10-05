import { Injectable } from '@angular/core';
import {
  CanActivateFn,
  CanDeactivateFn,
  CanMatchFn,
  RedirectCommand,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MockGuardFactory {
  constructor() {}

  public createCanActivateFn(returnVal: GuardReturnVal): CanActivateFn {
    return () => {
      return returnVal;
    };
  }

  public createCanDeactivateFn<TComponent>(
    returnVal: GuardReturnVal
  ): CanDeactivateFn<TComponent> {
    return () => {
      return returnVal;
    };
  }

  public createCanMatchFn(returnVal: GuardReturnVal): CanMatchFn {
    return () => {
      return returnVal;
    };
  }
}

export type GuardReturnVal =
  | Promise<boolean | UrlTree>
  | Observable<boolean | UrlTree>
  | boolean
  | UrlTree
  | RedirectCommand;
