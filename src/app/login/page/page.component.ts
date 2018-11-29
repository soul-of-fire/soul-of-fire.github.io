import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthService } from '../shared/auth.service';
import { Sign } from '../shared/store/auth-store';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  authForm: FormGroup;

  constructor(private formBuilder: FormBuilder, 
    public authService: AuthService, 
    private store: Store<any>) { }

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      email: ['mboyanov@develop-soft.com', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  get email() { return this.authForm.get('email'); }
  get password() { return this.authForm.get('password'); }

  onSubmit() {
    this.store.dispatch(new Sign({ 
      email: this.email.value, 
      password: this.password.value,
      returnSecureToken: true
    }))
    this.authForm.get('password').reset();
  }

  onLogout() {
    this.authService.logout();
  }
}
