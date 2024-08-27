import { CanActivateFn, Router } from '@angular/router'
import { AuthService } from '../services/auth.service'
import { inject } from '@angular/core'

export const loginActivateGuard: CanActivateFn = (route, state) => {
    return inject(AuthService).isLoggedIn()
        ? true
        : inject(Router).createUrlTree(['/login'])
}
