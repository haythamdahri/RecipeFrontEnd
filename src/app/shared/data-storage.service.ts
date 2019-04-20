import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Recipe} from '../recipes/recipe.model';
import {throwError} from 'rxjs';
import {RecipeService} from '../recipes/recipe.service';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import Swal from 'sweetalert2';
import {AuthService} from './auth.service';

@Injectable()
export class DataStorageService {
    private token: string;
    private DATA_URL: string = 'https://recipe-data-c9897.firebaseio.com/data.json';
    private APP_NAME_URL: string = 'https://recipe-data-c9897.firebaseio.com/appName.json';

    constructor(private http: HttpClient,
                private recipeService: RecipeService,
                private slService: ShoppingListService,
                private authService: AuthService) {
    }

    storeRecipes() {
        const headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.put(this.DATA_URL, this.recipeService.getRecipes(), {headers: headers}).pipe(
            map((response: HttpResponse<any>) => {
                console.log(response);
            }), catchError(this.handleError)
        );
    }

    fetchRecipes() {
        this.token = this.authService.getToken();
        let recipes: Recipe[] = [];
        const headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
        this.http.get(this.DATA_URL + '?auth=' + this.token, {headers: headers}).pipe(
            map((response) => {
                return response;
            }), catchError(this.handleError)
        ).subscribe(
            (tempRecipes: Recipe[]) => {
                recipes = tempRecipes;
            },
            (error) => {
                console.log(error);
            },
            () => {
                Swal.fire(
                    'Data fetched successflly',
                    'Local data is synchronized successflly!',
                    'success'
                );
                this.recipeService.updateRecipes(recipes);
            }
        );

    }

    getApplicationName() {
        this.token = this.authService.getToken();
        const headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.get(this.APP_NAME_URL + '?auth=' + this.token, {headers: headers}).pipe(
            map((response) => {
                return response;
            }), catchError(this.handleAppNameError)
        );
    }


    handleError(error: HttpErrorResponse) {
        return throwError(new Error('An occured, please try again!'));
    }

    private handleAppNameError() {
        return throwError('Default App Name');
    }
}
