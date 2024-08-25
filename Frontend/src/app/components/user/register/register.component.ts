import { Component } from '@angular/core'
import {
    AbstractControl,
    FormControl,
    FormGroup,
    ValidationErrors,
    Validators,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms'
import { AuthService } from 'src/app/services/auth.service'

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [ReactiveFormsModule, FormsModule],
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss',
})
export class RegisterComponent {
    userForm: FormGroup = new FormGroup(
        {
            name: new FormControl<string>('', Validators.required),
            email: new FormControl<string>('', [
                Validators.required,
                Validators.email,
            ]),
            password: new FormControl<string>('', Validators.required),
            passwordConfirmation: new FormControl<string>(
                '',
                Validators.required
            ),
        },
        { validators: this.passwordsMatch }
    )

    constructor(private authService: AuthService) {}

    private passwordsMatch(control: AbstractControl): ValidationErrors | null {
        const password = control.get('password')
        const passwordConfirmation = control.get('passwordConfirmation')
        return password?.value &&
            passwordConfirmation?.value &&
            password.value === passwordConfirmation.value
            ? null
            : { passwordsDontMatch: true }
    }

    onSubmit() {
        if (this.userForm.valid) {
            this.authService
                .createUser({
                    username: this.userForm.get('name')?.value,
                    email: this.userForm.get('email')?.value,
                    password: this.userForm.get('password')?.value,
                })
                .subscribe((res) => console.log(res))
        }
    }
}
