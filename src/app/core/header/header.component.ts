import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {RecipeService} from '../../recipes/recipe.service';
import {Subscription} from 'rxjs';
import {DataStorageService} from '../../shared/data-storage.service';
import {AuthService} from '../../shared/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnDestroy, OnInit {

    search: string = '';
    appName;
    subscription: Subscription;

    constructor(private router: Router,
                private dataStorageService: DataStorageService,
                private authService: AuthService) {

    }

    ngOnInit(): void {
        if (this.authService.isAuthenticated()) {
            this.appName = this.dataStorageService.getApplicationName();
        } else {
            this.appName = new Promise(
                (resolve, reject) => {
                    resolve('Default app name');
                }
            );
        }
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        this.appName = '';
    }

    onSearch(event: Event) {
        console.log((<HTMLInputElement> event.target).value);
        this.search = (<HTMLInputElement> event.target).value;
    }

    onDisplaySearch() {
        this.router.navigate(['/'], {
            queryParams: {search: this.search},
            fragment: 'loading',
            preserveFragment: true,
            preserveQueryParams: true
        });
    }

    onSave() {
        this.subscription = this.dataStorageService.storeRecipes().subscribe(
            (response) => {
                console.log(response);
                Swal.fire(
                    'Data saved successflly',
                    'Local data has been saved successflly!',
                    'success'
                );
            },
            (error) => {
                console.log(error);
            },
            () => {
                console.log('Completed');
            }
        );
    }

    onFetch() {
        this.dataStorageService.fetchRecipes();
    }

    onLogout() {
        this.authService.logout();
    }
}
