# NgxSerialRouteGuards

Collection of utilities for executing functional route guards serially.

## Examples

```typescript
// guards
export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);
  return authService.isAuthenticated() || router.createUrlTree(['/auth/login']);
};

export const adminGuard: CanActivateFn = () => {
  const router = inject(Router);
  const userService = inject(UserService);
  return userService.user?.isAdmin || router.createUrlTree(['
  /unauthorized']);
};

...

// routes
const routes: Routes = [
  {
    path: '/admin',
    loadComponent: () => import('./admin/admin.page').then(m => m.AdminPage),
    canActivate: [runSerially([authGuard, adminGuard])]
  }
]
```
