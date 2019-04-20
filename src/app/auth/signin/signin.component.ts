import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import Swal from "sweetalert2";
import {AuthService} from '../../shared/auth.service';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

    @ViewChild('signinForm') signinForm: FormGroup;

    constructor(private authService: AuthService) {
    }

    ngOnInit() {
        this.signinForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [
                Validators.required,
                Validators.pattern(/^[a-zA-Z]{1,10}[0-9]+$/)
            ])
        });
    }

    onSignin() {
        if (this.signinForm.valid) {
            this.authService.signinUser(this.signinForm.value.email, this.signinForm.value.password);
        } else {
            Swal.fire({
                title: 'Invalid input',
                text: 'Provided data is not valid, please check it',
                confirmButtonText: 'Ok',
                type: 'error'
            });
        }
    }
}
