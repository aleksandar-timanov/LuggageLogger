import { Component } from '@angular/core'
import { AuthService } from 'src/app/services/auth.service'

@Component({
    selector: 'app-top-bar',
    standalone: true,
    imports: [],
    templateUrl: './top-bar.component.html',
    styleUrl: './top-bar.component.scss',
})
export class TopBarComponent {
    constructor(private authService: AuthService) {}

    get isUserLoggedIn() {
        return this.authService.isLoggedIn()
    }

    logoutClicked() {
        this.authService.logout()
    }
}
