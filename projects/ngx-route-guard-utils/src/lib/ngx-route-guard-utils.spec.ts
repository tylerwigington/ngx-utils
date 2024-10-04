import {
  canActivateSerially,
  canDeactivateSerially,
  canMatchSerially,
} from './ngx-route-guard-utils';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockGuardFactory } from './testing/mock-guard-factory.service';
import {
  ActivatedRouteSnapshot,
  RedirectCommand,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { MockComponent } from './testing/mock-component';

describe('CanActivateSerially', () => {
  let guardService: MockGuardFactory;
  const route: ActivatedRouteSnapshot = {} as any;
  const state: RouterStateSnapshot = {} as any;
  let router: Router;
  let loginUrlTree: UrlTree;
  let redirectCommand: RedirectCommand;

  beforeEach(() => {
    guardService = TestBed.inject(MockGuardFactory);
    router = TestBed.inject(Router);
    loginUrlTree = router.createUrlTree(['/login']);
    redirectCommand = new RedirectCommand(loginUrlTree, {
      skipLocationChange: true,
    });
  });

  beforeEach(() => {
    guardService = TestBed.inject(MockGuardFactory);
    router = TestBed.inject(Router);
    loginUrlTree = router.createUrlTree(['/login']);
    redirectCommand = new RedirectCommand(loginUrlTree, {
      skipLocationChange: true,
    });
  });

  it('Should be defined', () => {
    expect(canActivateSerially).toBeTruthy();
  });

  it('Should return true for valid guard', async () => {
    TestBed.runInInjectionContext(async () => {
      const result = await firstValueFrom(
        canActivateSerially([guardService.createCanActivateFn(true)])(
          route,
          state
        )
      );
      expect(result).toBe(true);
    });
  });

  it('Should return true for valid guards', async () => {
    TestBed.runInInjectionContext(async () => {
      const result = await firstValueFrom(
        canActivateSerially([
          guardService.createCanActivateFn(true),
          guardService.createCanActivateFn(true),
        ])(route, state)
      );
      expect(result).toBe(true);
    });
  });
  it('Should return false for one valid and invalid guard', async () => {
    TestBed.runInInjectionContext(async () => {
      const result = await firstValueFrom(
        canActivateSerially([
          guardService.createCanActivateFn(true),
          guardService.createCanActivateFn(false),
        ])(route, state)
      );
      expect(result).toBe(false);
    });
  });
  it('Should return UrlTree from invalid guard', async () => {
    TestBed.runInInjectionContext(async () => {
      const result = await firstValueFrom(
        canActivateSerially([
          guardService.createCanActivateFn(true),
          guardService.createCanActivateFn(true),
          guardService.createCanActivateFn(router.createUrlTree(['/login'])),
        ])(route, state)
      );
      expect(result).toBeInstanceOf(UrlTree);
    });
  });

  it('Should return UrlTree with login url from invalid guard', async () => {
    TestBed.runInInjectionContext(async () => {
      const result = await firstValueFrom(
        canActivateSerially([
          guardService.createCanActivateFn(true),
          guardService.createCanActivateFn(true),
          guardService.createCanActivateFn(router.createUrlTree(['/login'])),
        ])(route, state)
      );
      expect(result).toEqual(loginUrlTree);
    });
  });

  it('Should return RedirectCommand from invalid guard', async () => {
    TestBed.runInInjectionContext(async () => {
      const result = await firstValueFrom(
        canActivateSerially([
          guardService.createCanActivateFn(true),
          guardService.createCanActivateFn(true),
          guardService.createCanActivateFn(redirectCommand),
        ])(route, state)
      );
      expect(result).toBeInstanceOf(RedirectCommand);
    });
  });

  it('Should return RedirectCommand with login url from invalid guard', async () => {
    TestBed.runInInjectionContext(async () => {
      const result = await firstValueFrom(
        canActivateSerially([
          guardService.createCanActivateFn(true),
          guardService.createCanActivateFn(true),
          guardService.createCanActivateFn(redirectCommand),
        ])(route, state)
      );
      expect(result).toEqual(redirectCommand);
    });
  });
});

describe('CanDeactivateSerially', () => {
  let guardService: MockGuardFactory;
  const route: ActivatedRouteSnapshot = {} as any;
  const state: RouterStateSnapshot = {} as any;
  const nextState: RouterStateSnapshot = {} as any;
  const urls: UrlSegment[] = [];

  let router: Router;
  let loginUrlTree: UrlTree;
  let redirectCommand: RedirectCommand;
  let component: MockComponent;
  let fixture: ComponentFixture<MockComponent>;

  beforeEach(() => {
    guardService = TestBed.inject(MockGuardFactory);
    router = TestBed.inject(Router);
    loginUrlTree = router.createUrlTree(['/login']);
    redirectCommand = new RedirectCommand(loginUrlTree, {
      skipLocationChange: true,
    });
    fixture = TestBed.createComponent(MockComponent);
    component = fixture.componentInstance;
  });

  it('Should be defined', () => {
    expect(canDeactivateSerially).toBeTruthy();
  });

  it('Should return true for valid guard', async () => {
    TestBed.runInInjectionContext(async () => {
      const result = await firstValueFrom(
        canDeactivateSerially([
          guardService.createCanDeactivateFn<MockComponent>(true),
        ])(component, route, state, nextState)
      );
      expect(result).toBe(true);
    });
  });

  it('Should return true for valid guards', async () => {
    TestBed.runInInjectionContext(async () => {
      const result = await firstValueFrom(
        canDeactivateSerially([
          guardService.createCanDeactivateFn<MockComponent>(true),
          guardService.createCanDeactivateFn<MockComponent>(true),
        ])(component, route, state, nextState)
      );
      expect(result).toBe(true);
    });
  });
  it('Should return false for one valid and invalid guard', async () => {
    TestBed.runInInjectionContext(async () => {
      const result = await firstValueFrom(
        canDeactivateSerially([
          guardService.createCanDeactivateFn<MockComponent>(true),
          guardService.createCanDeactivateFn<MockComponent>(false),
        ])(component, route, state, nextState)
      );
      expect(result).toBe(false);
    });
  });
  it('Should return UrlTree from invalid guard', async () => {
    TestBed.runInInjectionContext(async () => {
      const result = await firstValueFrom(
        canDeactivateSerially([
          guardService.createCanDeactivateFn<MockComponent>(true),
          guardService.createCanDeactivateFn<MockComponent>(true),
          guardService.createCanDeactivateFn<MockComponent>(
            router.createUrlTree(['/login'])
          ),
        ])(component, route, state, nextState)
      );
      expect(result).toBeInstanceOf(UrlTree);
    });
  });

  it('Should return UrlTree with login url from invalid guard', async () => {
    TestBed.runInInjectionContext(async () => {
      const result = await firstValueFrom(
        canDeactivateSerially([
          guardService.createCanDeactivateFn<MockComponent>(true),
          guardService.createCanDeactivateFn<MockComponent>(true),
          guardService.createCanDeactivateFn<MockComponent>(
            router.createUrlTree(['/login'])
          ),
        ])(component, route, state, nextState)
      );
      expect(result).toEqual(loginUrlTree);
    });
  });

  it('Should return RedirectCommand from invalid guard', async () => {
    TestBed.runInInjectionContext(async () => {
      const result = await firstValueFrom(
        canDeactivateSerially([
          guardService.createCanDeactivateFn<MockComponent>(true),
          guardService.createCanDeactivateFn<MockComponent>(true),
          guardService.createCanDeactivateFn<MockComponent>(redirectCommand),
        ])(component, route, state, nextState)
      );
      expect(result).toBeInstanceOf(RedirectCommand);
    });
  });

  it('Should return RedirectCommand with login url from invalid guard', async () => {
    TestBed.runInInjectionContext(async () => {
      const result = await firstValueFrom(
        canDeactivateSerially([
          guardService.createCanDeactivateFn<MockComponent>(true),
          guardService.createCanDeactivateFn<MockComponent>(true),
          guardService.createCanDeactivateFn<MockComponent>(redirectCommand),
        ])(component, route, state, nextState)
      );
      expect(result).toEqual(redirectCommand);
    });
  });
});

describe('CanMatchSerially', () => {
  let guardService: MockGuardFactory;
  const route: Route = {} as any;
  const urls: UrlSegment[] = [];

  let router: Router;
  let loginUrlTree: UrlTree;
  let redirectCommand: RedirectCommand;
  let component: MockComponent;
  let fixture: ComponentFixture<MockComponent>;

  beforeEach(() => {
    guardService = TestBed.inject(MockGuardFactory);
    router = TestBed.inject(Router);
    loginUrlTree = router.createUrlTree(['/login']);
    redirectCommand = new RedirectCommand(loginUrlTree, {
      skipLocationChange: true,
    });
    fixture = TestBed.createComponent(MockComponent);
    component = fixture.componentInstance;
  });

  it('Should be defined', () => {
    expect(canMatchSerially).toBeTruthy();
  });

  it('Should return true for valid guard', async () => {
    TestBed.runInInjectionContext(async () => {
      const result = await firstValueFrom(
        canMatchSerially([guardService.createCanMatchFn(true)])(route, urls)
      );
      expect(result).toBe(true);
    });
  });

  it('Should return true for valid guards', async () => {
    TestBed.runInInjectionContext(async () => {
      const result = await firstValueFrom(
        canMatchSerially([
          guardService.createCanMatchFn(true),
          guardService.createCanMatchFn(true),
        ])(route, urls)
      );
      expect(result).toBe(true);
    });
  });
  it('Should return false for one valid and invalid guard', async () => {
    TestBed.runInInjectionContext(async () => {
      const result = await firstValueFrom(
        canMatchSerially([
          guardService.createCanMatchFn(true),
          guardService.createCanMatchFn(false),
        ])(route, urls)
      );
      expect(result).toBe(false);
    });
  });
  it('Should return UrlTree from invalid guard', async () => {
    TestBed.runInInjectionContext(async () => {
      const result = await firstValueFrom(
        canMatchSerially([
          guardService.createCanMatchFn(true),
          guardService.createCanMatchFn(true),
          guardService.createCanMatchFn(router.createUrlTree(['/login'])),
        ])(route, urls)
      );
      expect(result).toBeInstanceOf(UrlTree);
    });
  });

  it('Should return UrlTree with login url from invalid guard', async () => {
    TestBed.runInInjectionContext(async () => {
      const result = await firstValueFrom(
        canMatchSerially([
          guardService.createCanMatchFn(true),
          guardService.createCanMatchFn(true),
          guardService.createCanMatchFn(router.createUrlTree(['/login'])),
        ])(route, urls)
      );
      expect(result).toEqual(loginUrlTree);
    });
  });

  it('Should return RedirectCommand from invalid guard', async () => {
    TestBed.runInInjectionContext(async () => {
      const result = await firstValueFrom(
        canMatchSerially([
          guardService.createCanMatchFn(true),
          guardService.createCanMatchFn(true),
          guardService.createCanMatchFn(redirectCommand),
        ])(route, urls)
      );
      expect(result).toBeInstanceOf(RedirectCommand);
    });
  });

  it('Should return RedirectCommand with login url from invalid guard', async () => {
    TestBed.runInInjectionContext(async () => {
      const result = await firstValueFrom(
        canMatchSerially([
          guardService.createCanMatchFn(true),
          guardService.createCanMatchFn(true),
          guardService.createCanMatchFn(redirectCommand),
        ])(route, urls)
      );
      expect(result).toEqual(redirectCommand);
    });
  });
});
