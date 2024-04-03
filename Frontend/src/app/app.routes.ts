import { Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { AllTripsComponent } from './components/all-trips/all-trips.component';
import { TripDetailsComponent } from './components/trip-details/trip-details.component';
import { CreateTripComponent } from './components/create-trip/create-trip.component';
import { EditTripComponent } from './components/edit-trip/edit-trip.component';

export const routes: Routes = [
  { path: 'user', component: UserComponent },
  { path: 'all-trips', component: AllTripsComponent },
  { path: 'trip-details', component: TripDetailsComponent },
  { path: 'create-trip', component: CreateTripComponent },
  { path: 'edit-trip', component: EditTripComponent },
];
