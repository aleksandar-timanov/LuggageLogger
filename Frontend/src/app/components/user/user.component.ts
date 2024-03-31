import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {
  user: User | undefined;
  userForm = new FormGroup({
    name: new FormControl<string>('', Validators.required),
    email: new FormControl<string>('', Validators.required),
  })

  constructor(private apiService: ApiService) { }

  onSubmit() {
    if (this.userForm.valid) {
      this.user = {
        name: this.userForm.value.name!,
        email: this.userForm.value.email!
      };

      this.apiService.createUser(this.user)
        .subscribe(res => console.log(res));
    }
  }

  ngOnInit(): void {
    this.apiService.getAllUsers().subscribe(users => {
      console.log(users);
    })

  }

}
