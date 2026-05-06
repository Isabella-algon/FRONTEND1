import { CanActivateFn, Router } from "@angular/router";
import { inject } from '@angular/core';
import { LoginService } from "../service/loginService/loginService";

export const authGuard: CanActivateFn = (route) => {

  const auth = inject(LoginService);
  const router = inject(Router);

  // 1. Si NO está logueado → lo manda al login
  if (!auth.isAuthenticated()) {
    router.navigate(['/login']);
    return false;
  }

  // 2. Obtenemos el rol del usuario
  const user = auth.getUser();
  const role = user?.role_id;

  // 3. SOLO para la ruta users
  if (route.routeConfig?.path === 'users') {

    // si NO es admin (1)
    if (role !== 1) {
      router.navigate(['/home']); // lo sacamos
      return false;
    }
  }

  return true;
};