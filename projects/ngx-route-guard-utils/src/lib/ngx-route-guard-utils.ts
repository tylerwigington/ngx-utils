import {
  inject,
  EnvironmentInjector,
  runInInjectionContext,
} from '@angular/core';
import {
  CanActivateFn,
  CanActivateChildFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanDeactivateFn,
  CanMatchFn,
  Route,
  UrlSegment,
} from '@angular/router';
import { concat, takeWhile, last } from 'rxjs';
import { wrapIntoObservable } from './internal/utils';

/**
 * Runs the CanActivateFn route guards serially.
 * @param guards Route guards to be run serially.
 * @returns An observable that resolves to true if all guards are valid. Otherwise it returns the value from the first guard that failed.
 */
export const canActivateSerially =
  (guards: CanActivateFn[] | CanActivateChildFn[]) =>
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const injector = inject(EnvironmentInjector);
    const guardResults = [];
    for (const guard of guards) {
      guardResults.push(
        wrapIntoObservable(
          runInInjectionContext(injector, () => guard(route, state))
        )
      );
    }

    return concat(...guardResults).pipe(
      takeWhile((v) => typeof v === 'boolean' && v.valueOf() === true, true),
      last()
    );
  };

/**
 * Runs the CanMatchFn route guards serially.
 * @param guards Route guards to be run serially.
 * @returns An observable that resolves to true if all guards are valid. Otherwise it returns the value from the first guard that failed.
 */
export const canMatchSerially =
  (guards: CanMatchFn[]) => (route: Route, segments: UrlSegment[]) => {
    const injector = inject(EnvironmentInjector);
    const guardResults = [];
    for (const guard of guards) {
      guardResults.push(
        wrapIntoObservable(
          runInInjectionContext(injector, () => guard(route, segments))
        )
      );
    }

    return concat(...guardResults).pipe(
      takeWhile((v) => typeof v === 'boolean' && v.valueOf() === true, true),
      last()
    );
  };

/**
 * Runs the CanDeactivateFn route guards serially.
 * @param guards Route guards to be run serially.
 * @returns An observable that resolves to true if all guards are valid. Otherwise it returns the value from the first guard that failed.
 */
export const canDeactivateSerially =
  <TComponent>(guards: CanDeactivateFn<TComponent>[]) =>
  (
    component: TComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
  ) => {
    const injector = inject(EnvironmentInjector);
    const guardResults = [];
    for (const guard of guards) {
      guardResults.push(
        wrapIntoObservable(
          runInInjectionContext(injector, () =>
            guard(component, currentRoute, currentState, nextState)
          )
        )
      );
    }

    return concat(...guardResults).pipe(
      takeWhile((v) => typeof v === 'boolean' && v.valueOf() === true, true),
      last()
    );
  };
