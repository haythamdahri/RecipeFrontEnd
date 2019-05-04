import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private token: string;

    constructor(private router: Router) {
    }

    signupUser(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch((err) => {
                if (err['code'] != null && err['message'] != null) {
                    Swal.fire({
                        title: 'Singup Error',
                        text: err['message'],
                        confirmButtonText: 'Ok',
                        type: 'error'
                    });
                }
            }).then(
            (response) => {
                Swal.fire({
                    title: 'Account created successflly',
                    text: 'Your account is registered with : ' + response['user']['email'],
                    confirmButtonText: 'Ok',
                    type: 'success'
                });
                this.router.navigateByUrl('/signin');
            }
        );
    }

    signinUser(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .catch((err) => {
                if (err['code'] != null && err['message'] != null) {
                    Swal.fire({
                        title: 'Bad login credentials or Login errors',
                        text: err['message'],
                        confirmButtonText: 'Ok',
                        type: 'error'
                    });
                }
            }).then(
            (response) => {
                if (response != null) {
                    firebase.auth().currentUser.getIdToken()
                        .catch((err) => {
                            console.log(err);
                        })
                        .then(
                            (token: string) => {
                                this.token = token;
                            }
                        );
                    Swal.fire({
                        title: 'User Signed in successflly',
                        text: 'Your are signed in as: ' + response['user']['email'],
                        confirmButtonText: 'Ok',
                        type: 'success'
                    });
                    this.router.navigateByUrl('/');
                }

            }
        );
    }

    getToken() {
        if( firebase.auth().currentUser != null ){
            firebase.auth().currentUser.getIdToken()
                .catch((err) => {
                    console.log(err);
                })
                .then(
                    (token: string) => {
                        this.token = token;
                    }
                );
        }

        return this.token;
    }

    isAuthenticated() {
        return this.token != null;
    }

    logout() {
        firebase.auth().signOut();
        this.token = null;
        this.router.navigateByUrl('/');
    }

}
