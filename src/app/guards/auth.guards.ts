import { CanActivateFn, Router } from "@angular/router";
import {inject} from '@angular/core';
import { LoginService } from "../services/loginService/loginService";
 
export const authGuard: CanActivateFn = (_route, state) => {
    const auth = inject(LoginService);
    const router = inject(Router);
 
    if(auth.isAuthenticated()) return true;
    router.navigateByUrl(`/login?returnUrl=${encodeURIComponent(state.url)}`)
    return false
}
