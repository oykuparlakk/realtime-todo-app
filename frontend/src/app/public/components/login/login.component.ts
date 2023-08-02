import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user-service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  form: FormGroup = new FormGroup({
    email: new FormControl(null,[Validators.required, Validators.email]),
    password: new FormControl(null,[Validators.required]),
  });

  constructor(
    private userService: UserService, 
    private router: Router)
    {}
    
    login(){
      if(this.form.valid){
        this.userService.login({
          email: this.email.value,
          password: this.password.value,
        }).subscribe();
      }
  
    }

    get email() : FormControl {
      return this.form.get('email') as FormControl;
    }

    get password() : FormControl {
      return this.form.get('password') as FormControl;
    }
  
}
