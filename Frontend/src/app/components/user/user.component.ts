import { Component, OnInit } from '@angular/core'
import { User } from '../../models/user.model'
import { ApiService } from '../../services/api.service'

@Component({
    selector: 'app-user',
    standalone: true,
    imports: [],
    templateUrl: './user.component.html',
    styleUrl: './user.component.scss',
})
export class UserComponent {
    user: User | undefined

    constructor(private apiService: ApiService) {}
}
