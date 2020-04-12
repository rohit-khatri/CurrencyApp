import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl('',[
      Validators.required,
      Validators.minLength(5)
    ]),
    password: new FormControl('',[
      Validators.required,
      Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
    ]),
  });

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    if(this.authService.getIsAuthenticated()) {
      this.router.navigate(['exchange/list']);
    }
  }

  onSubmit() {
    if(!this.loginForm.valid) {
      return false;
    }
    this.authService.login(this.loginForm);

  }
}
