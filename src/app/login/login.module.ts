import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page/page.component';
import { AuthService } from 'src/app/login/shared/auth.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ToasterModule } from 'angular2-toaster/src/toaster.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { authReducer } from 'src/app/login/shared/store/auth-store';
import { AuthEffects } from 'src/app/login/shared/store/auth-effects';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature([AuthEffects]),
    ToasterModule.forRoot()
  ],
  exports: [
    PageComponent
  ],
  declarations: [PageComponent],
  providers: [AuthService]
})
export class LoginModule { }
