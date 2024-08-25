import { HttpClient } from '@angular/common/http'
import { Injectable, isDevMode } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from '../../environments/environment'
import { Trip } from '../models/trip.model'

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private url =
        isDevMode() && environment.apiUrl !== ''
            ? environment.apiUrl
            : 'http://localhost:8080' //TODO: change this to the actual backend URL
    constructor(private http: HttpClient) {}

    public getAllTrips(): Observable<any> {
        return this.http.get(`${this.url}/trips`)
    }

    public getTrip(tripId: number): Observable<any> {
        return this.http.get(`${this.url}/trips/${tripId}`)
    }

    public createTrip(trip: Trip) {
        return this.http.post(`${this.url}/trips`, trip)
    }
}
