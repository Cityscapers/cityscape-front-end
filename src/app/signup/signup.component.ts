import { Component, OnInit } from '@angular/core';
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserInformationService } from '../shared/services/user.information.service';
import {User} from 'firebase';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  registerForm: FormGroup;
  errorMessage: string;
  successMessage: string;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: UserInformationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.createForm();
    this.errorMessage = '';
    this.successMessage = '';
  }

  createForm() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.maxLength(30), Validators.email]],
      password: ['', [Validators.required, Validators.maxLength(15)]],
      username: ['', [Validators.required, Validators.maxLength(10)]]
    });
  }

  tryRegister(value) {
    console.log(this.registerForm.controls.email.hasError('maxlength'));
    this.loading = true;
    this.authService.doRegister(value)
      .then(res => {
        this.errorMessage = '';
        this.successMessage = 'Your account has been created';
        this.loading = false;
        this.authService.doLogout().then(r => {});
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = '';
        this.loading = false;
      });
  }

  tryGoogleLogin() {
    this.authService.doGoogleLogin()
      .then(res => {
          this.router.navigate(['/user']);
        }, err => console.log(err)
      );
  }

}
