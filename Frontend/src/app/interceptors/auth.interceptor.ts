import { HttpInterceptorFn } from '@angular/common/http'

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    if (typeof window !== 'undefined') {
        const idToken = localStorage.getItem('id_token')

        if (idToken) {
            const cloned = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + idToken),
            })

            return next(cloned)
        } else {
            return next(req)
        }
    }
    return next(req)
}
