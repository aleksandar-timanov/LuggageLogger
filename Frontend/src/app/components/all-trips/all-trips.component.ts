import { Component } from '@angular/core';

@Component({
  selector: 'app-all-trips',
  standalone: true,
  imports: [],
  templateUrl: './all-trips.component.html',
  styleUrl: './all-trips.component.scss'
})
export class AllTripsComponent {

  temporaryData: any = [
    {
      "destination": "Sofia",
      "departureDate": new Date(2024, 7, 15),
      "returnDate ": new Date(2024, 7, 15)
    },
    {
      "destination": "Sofia",
      "departureDate": new Date(2024, 7, 15),
      "returnDate ": new Date(2024, 7, 15)
    },
    {
      "destination": "Sofia",
      "departureDate": new Date(2024, 7, 15),
      "returnDate ": new Date(2024, 7, 15)
    },
    {
      "destination": "Sofia",
      "departureDate": new Date(2024, 7, 15),
      "returnDate ": new Date(2024, 7, 15)
    },
    {
      "destination": "Sofia",
      "departureDate": new Date(2024, 7, 15),
      "returnDate ": new Date(2024, 7, 15)
    },
    {
      "destination": "Sofia",
      "departureDate": new Date(2024, 7, 15),
      "returnDate ": new Date(2024, 7, 15)
    }
  ]

}
