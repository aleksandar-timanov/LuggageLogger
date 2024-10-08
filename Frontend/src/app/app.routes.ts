import { Routes } from '@angular/router'
import { UserComponent } from './components/user/user.component'
import { AllTripsComponent } from './components/all-trips/all-trips.component'
import { TripDetailsComponent } from './components/trip-details/trip-details.component'
import { CreateTripComponent } from './components/create-trip/create-trip.component'
import { EditTripComponent } from './components/edit-trip/edit-trip.component'
import { RegisterComponent } from './components/user/register/register.component'
import { LoginComponent } from './components/user/login/login.component'
import { loginActivateGuard } from './guards/login-activate.guard'

export const routes: Routes = [
    { path: '', redirectTo: 'trips', pathMatch: 'full' },
    // { path: 'user', component: UserComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    {
        path: 'trips',
        component: AllTripsComponent,
        canActivate: [loginActivateGuard],
    },
    {
        path: 'trips/:id',
        component: TripDetailsComponent,
        canActivate: [loginActivateGuard],
    },
    //TODO: page not found
]
