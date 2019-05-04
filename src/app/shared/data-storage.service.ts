import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders, HttpParams, HttpRequest, HttpResponse} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Recipe} from '../recipes/recipe.model';
import {throwError} from 'rxjs';
import {RecipeService} from '../recipes/recipe.service';
import Swal from 'sweetalert2';
import {AuthService} from './auth.service';


// No more auth because it will be injected by the AuthInterceptor
@Injectable()
export class DataStorageService {
    private token: string;
    private DATA_URL: string = 'https://recipe-data-c9897.firebaseio.com/data.json';
    private APP_NAME_URL: string = 'https://recipe-data-c9897.firebaseio.com/appName.json';

    constructor(private http: HttpClient,
                private recipeService: RecipeService,
                private authService: AuthService) {
    }

    storeRecipes() {
        const headers: HttpHeaders = new HttpHeaders().append('Content-Type', 'application/json');
        // const setHeader: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'}).set('authorization', 'MYTOKEN');
        // const deleteHeader: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'}).delete('authorization', 'MYTOKEN');
        // const getHeaders: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'}).get('authorization');
        // const getAllHeaders: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'}).getAll('authorization');
        // const hasHeader: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'}).has('authorization');
        // const headersKeys: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'}).keys();
        // return this.http.put(this.DATA_URL, this.recipeService.getRecipes(), {
        //     headers: headers,
        //     observe: 'events',
        //     params: new HttpParams().append('auth', this.token)
        // }).pipe(
        //     map((response: HttpEvent<object>) => {
        //         console.log(response);
        //     }), catchError(this.handleError)
        // );
        const request = new HttpRequest('PUT', this.DATA_URL, this.recipeService.getRecipes(), {
            reportProgress: true
        });
        return this.http.request(request);
    }

    fetchRecipes() {
        this.token = this.authService.getToken();
        let recipes: Recipe[] = [];
        const headers: HttpHeaders = new HttpHeaders().append('Content-Type', 'application/json');
        this.http.get<Recipe[]>(this.DATA_URL, {
            headers: headers,
            observe: 'body',
            responseType: 'json'
        }).pipe(
            map((response) => {
                return response;
            }), catchError(this.handleError)
        ).subscribe(
            (tempRecipes) => {
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
        const headers: HttpHeaders = new HttpHeaders().append('Content-Type', 'application/json');
        return this.http.get(this.APP_NAME_URL, {headers: headers}).pipe(
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
