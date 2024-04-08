import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { IconsModule } from '../../icons/icons.module'

@Component({
    selector: 'app-all-trips',
    standalone: true,
    imports: [CommonModule, IconsModule],
    templateUrl: './all-trips.component.html',
    styleUrl: './all-trips.component.scss',
})
export class AllTripsComponent {
    public deleteModalOpenedFor: number | null = null
    temporaryData: any = [
        {
            id: 0,
            destination: 'Sofia',
            departureDate: new Date(2024, 7, 15),
            returnDate: new Date(2024, 7, 15),
        },
        {
            id: 1,
            destination: 'Sofia',
            departureDate: new Date(2024, 7, 15),
            returnDate: new Date(2024, 7, 15),
        },
        {
            id: 2,
            destination: 'Sofia',
            departureDate: new Date(2024, 7, 15),
            returnDate: new Date(2024, 7, 15),
        },
        {
            id: 3,
            destination: 'Sofia',
            departureDate: new Date(2024, 7, 15),
            returnDate: new Date(2024, 7, 15),
        },
        {
            id: 6,
            destination: 'Sofia',
            departureDate: new Date(2024, 7, 15),
            returnDate: new Date(2024, 7, 15),
        },
        {
            id: 7,
            destination: 'Sofia',
            departureDate: new Date(2024, 7, 15),
            returnDate: new Date(2024, 7, 15),
        },
    ]

    public onChooseTrip(tripId: number): void {
        console.log(tripId)
    }

    public onDeleteClick(event: Event, tripId: number): void {
        event.stopPropagation()
        console.log(`delete clicked for ${tripId}`)
        this.deleteModalOpenedFor = tripId
    }

    public onModalCloseClick(): void {
        this.deleteModalOpenedFor = null
    }

    public onCancelDownloadClick() {
        this.deleteModalOpenedFor = null
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
}
