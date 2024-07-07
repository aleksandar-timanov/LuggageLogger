import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Trip } from 'src/app/models/trip.model'
import { ApiService } from 'src/app/services/api.service'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule, FormGroup } from '@angular/forms'

@Component({
    selector: 'app-trip-details',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './trip-details.component.html',
    styleUrl: './trip-details.component.scss',
})
export class TripDetailsComponent {
    public trip: Trip | undefined
    tripForm: FormGroup | undefined
    public math = Math

    constructor(
        private route: ActivatedRoute,
        private apiService: ApiService
    ) {}
    ngOnInit() {
        const tripId = this.route.snapshot.params['id']
        this.apiService.getTrip(tripId).subscribe((trip: Trip) => {
            this.trip = trip
        })
    }

    public takenItemsPercentage() {
        const takenItems = this.trip?.luggageItems.filter(
            (item) => item.isTaken
        )

        return (takenItems!.length / this.trip!.luggageItems.length) * 100
    }
}
