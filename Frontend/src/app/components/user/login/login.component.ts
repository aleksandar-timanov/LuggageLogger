import { Component } from '@angular/core'
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms'
import { AuthService } from 'src/app/services/auth.service'
import { Router } from '@angular/router'

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
})
export class LoginComponent {
    form: FormGroup

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        this.form = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
        })
    }

    login() {
        const userData = this.form.value

        if (userData.username && userData.password) {
            this.authService.login(userData).subscribe(() => {
                console.log('User is logged in')
                this.router.navigateByUrl('/')
            })
        }
    }
}
