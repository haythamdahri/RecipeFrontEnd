import {NgModule} from '@angular/core';
import {SigninComponent} from './signin/signin.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SignupComponent} from './signup/signup.component';
import {CommonModule} from '@angular/common';
import {AuthRoutingModule} from './auth-routing.module';

@NgModule({
    declarations: [
        SigninComponent,
        SignupComponent
    ],
    imports: [
        // CommonModule must exists in any declared modules to have the access to ngClass, ngIf ...
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        AuthRoutingModule
    ]
})
export class AuthModule{

}
