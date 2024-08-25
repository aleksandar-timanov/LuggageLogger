import {
    AfterViewInit,
    Component,
    ElementRef,
    ViewChild,
    Output,
    EventEmitter,
} from '@angular/core'
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms'

@Component({
    selector: 'app-create-trip',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './create-trip.component.html',
    styleUrl: './create-trip.component.scss',
})
export class CreateTripComponent implements AfterViewInit {
    @Output() tripSubmitted = new EventEmitter()

    @ViewChild('destination') destinationInput!: ElementRef<HTMLInputElement>
    trip = {}
    newTrip = new FormGroup({
        destination: new FormControl<string>('', Validators.required),
        departureDate: new FormControl<Date>(new Date(), Validators.required),
        returnDate: new FormControl<Date>(new Date(), Validators.required),
    })

    ngAfterViewInit(): void {
        this.destinationInput.nativeElement.focus()
    }

    onSubmitNewTrip() {
        if (this.newTrip.valid) {
            console.log(this.newTrip.value)
            this.trip = {
                destination: this.newTrip.value.destination!,
                departureDate: new Date(
                    this.newTrip.value.departureDate!
                ).toISOString(),
                returnDate: new Date(
                    this.newTrip.value.returnDate!
                ).toISOString(),
            }

            return this.tripSubmitted.emit(this.trip)
        }
    }
}
