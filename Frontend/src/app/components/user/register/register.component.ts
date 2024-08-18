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

    private passwordsMatch(control: AbstractControl): ValidationErrors | null {
        const password = control.get('password')
        const passwordConfirmation = control.get('passwordConfirmation')
        return password &&
            passwordConfirmation &&
            password === passwordConfirmation
            ? null
            : { passwordsDontMatch: true }
    }

    onSubmit() {
        if (this.userForm.valid) {
            console.log(this.userForm.value)
        }
    }
}
