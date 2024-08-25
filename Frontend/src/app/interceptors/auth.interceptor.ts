import { HttpInterceptorFn } from '@angular/common/http'

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const idToken = localStorage.getItem('id_token')
    console.log(idToken, localStorage.getItem('expires_at'))

    if (idToken) {
        const cloned = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + idToken),
        })

        return next(cloned)
    } else {
        return next(req)
    }
}
