import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Recipe} from '../recipes/recipe.model';
import {throwError} from 'rxjs';
import {RecipeService} from '../recipes/recipe.service';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import Swal from "sweetalert2";

@Injectable()
export class DataStorageService {

    private DATA_URL: string = 'https://recipe-data-c9897.firebaseio.com/data.json';

    constructor(private http: HttpClient,
                private recipeService: RecipeService,
                private slService: ShoppingListService){}

    storeRecipes() {
        const headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.put(this.DATA_URL, this.recipeService.getRecipes(), {headers: headers}).pipe(
            map((response: HttpResponse<any>) => {
                console.log(response);
            }), catchError(this.handleError)
        );
    }

    fetchRecipes() {
        let recipes: Recipe[] = [];
        const headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
        this.http.get(this.DATA_URL, {headers: headers}).pipe(
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

    handleError(error: HttpErrorResponse) {
        return throwError(new Error('An occured, please try again!'));
    }
}
