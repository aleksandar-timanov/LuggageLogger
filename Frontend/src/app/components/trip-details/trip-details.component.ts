import { Component, Input } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Trip } from 'src/app/models/trip.model'
import { ApiService } from 'src/app/services/api.service'
import { CommonModule } from '@angular/common'

@Component({
    selector: 'app-trip-details',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './trip-details.component.html',
    styleUrl: './trip-details.component.scss',
})
export class TripDetailsComponent {
    public trip: Trip | undefined

    constructor(
        private route: ActivatedRoute,
        private apiService: ApiService
    ) {}
    ngOnInit() {
        const tripId = this.route.snapshot.params['id']
        this.apiService.getTrip(tripId).subscribe((trip) => {
            this.trip = trip
        })
    }
}
