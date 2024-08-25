import { Injectable, isDevMode } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, shareReplay, tap } from 'rxjs'
import { environment } from '../../environments/environment'
import { User } from '../models/user.model'

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private url =
        isDevMode() && environment.apiUrl !== ''
            ? environment.apiUrl
            : 'http://localhost:8080' //TODO: change this to the actual backend URL
    constructor(private http: HttpClient) {}

    public getAllUsers(): Observable<any> {
        return this.http.get(`${this.url}/users`)
    }

    public createUser(userData: User): Observable<Object> {
        console.log(userData, this.url)
        return this.http
            .post<User>(`${this.url}/api/v1/auth/register`, userData)
            .pipe(
                tap(() => this.setSession),
                shareReplay()
            )
    }

    public login(userData: User): Observable<Object> {
        return this.http
            .post<User>(`${this.url}/api/v1/auth/authenticate`, userData)
            .pipe(
                tap(() => this.setSession),
                shareReplay()
            )
    }

    public logout() {
        localStorage.removeItem('id_token')
        localStorage.removeItem('expires_at')
    }

    public isLoggedIn() {
        return Date.now() < this.getExpiration()
    }

    // session related
    private setSession(authResult: { expiresIn: number; token: string }) {
        const expiresAt = authResult.expiresIn
        localStorage.setItem('id_token', authResult.token)
        localStorage.setItem('expires_at', JSON.stringify(expiresAt))
    }

    private getExpiration() {
        const expiration = localStorage.getItem('expires_at')
        if (expiration) {
            const expiresAt = JSON.parse(expiration)
            return expiresAt
        } else {
            return 0
        }
    }
}
