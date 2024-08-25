import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { IconsModule } from '../../icons/icons.module'
import { ModalComponent } from '../modal/modal.component'
import { CreateTripComponent } from '../create-trip/create-trip.component'
import { ApiService } from '../../services/api.service'
import { Trip } from '../../models/trip.model'
import { Router } from '@angular/router'

@Component({
    selector: 'app-all-trips',
    standalone: true,
    imports: [CommonModule, IconsModule, ModalComponent, CreateTripComponent],
    templateUrl: './all-trips.component.html',
    styleUrl: './all-trips.component.scss',
})
export class AllTripsComponent {
    public deleteModalOpenedFor: number | null = null
    public isCreateModalOpen = false
    temporaryData: any = []

    public constructor(
        private apiService: ApiService,
        private router: Router
    ) {}

    ngOnInit() {
        this.apiService.getAllTrips().subscribe((data: Trip[]) => {
            this.temporaryData = data
        })
    }

    public onChooseTrip(tripId: number): void {
        console.log(tripId)
        this.router.navigate(['/trips', tripId])
    }

    public onDeleteClick(event: Event, tripId: number): void {
        event.stopPropagation()
        console.log(`delete clicked for ${tripId}`)
        this.deleteModalOpenedFor = tripId
    }

    public onCancelDeleteClick() {
        this.deleteModalOpenedFor = null
    }

    public onCancelCreateClick() {
        this.isCreateModalOpen = false
    }

    public onConfirmDeleteClick(tripToDeleteId: number) {
        this.temporaryData.splice(
            this.temporaryData
                .map((trip: any) => trip.id)
                .indexOf(tripToDeleteId),
            1
        )

        this.deleteModalOpenedFor = null
    }

    public onCreateCardClick() {
        this.isCreateModalOpen = true
    }

    public onNewTripSubmitted(trip: any) {
        console.log(trip)
        this.temporaryData.push({ id: this.temporaryData.length, ...trip })
        this.isCreateModalOpen = false
        this.apiService.createTrip(trip).subscribe((res) => console.log(res))
    }
}
