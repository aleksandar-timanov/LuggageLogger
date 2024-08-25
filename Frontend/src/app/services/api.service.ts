import { HttpClient } from '@angular/common/http'
import { Injectable, isDevMode } from '@angular/core'
import { Observable, shareReplay } from 'rxjs'
import { User } from '../models/user.model'
import { environment } from '../../environments/environment'

@Injectable({
    providedIn: 'root',
})
export class ApiService {
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
            .pipe(shareReplay())
    }

    public getAllTrips(): Observable<any> {
        return this.http.get(`${this.url}/trips`)
    }

    public getTrip(tripId: number): Observable<any> {
        return this.http.get(`${this.url}/trips/${tripId}`)
    }

    // session related
    private setSession(authResult: { expiresIn: number; idToken: string }) {
        const expiresAt = authResult.expiresIn
        localStorage.setItem('id_token', authResult.idToken)
        localStorage.setItem('expires_at', JSON.stringify(expiresAt))
    }
}
