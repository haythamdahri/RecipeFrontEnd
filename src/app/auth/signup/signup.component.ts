import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {AuthService} from '../../shared/auth.service';

@Component({
    selector: 'app-singup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    @ViewChild('f') form: NgForm;

    constructor(private authService: AuthService) {
    }

    ngOnInit() {
    }

    onSignup() {
        if (this.form.valid) {
            this.authService.signupUser(this.form.value.email, this.form.value.password);
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
