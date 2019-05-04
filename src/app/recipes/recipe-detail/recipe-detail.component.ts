import {Component, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {ActivatedRoute, Data, Params, Router} from '@angular/router';
import Swal from 'sweetalert2';
import {Store} from '@ngrx/store';
import * as shoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as fromShoppingList from '../../shopping-list/store/shopping-list.reducers';
@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html',
    styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

    recipe: Recipe;


    constructor(private recipeService: RecipeService,
                private route: ActivatedRoute,
                private router: Router,
                private store: Store<fromShoppingList.AppState>) {
    }

    ngOnInit() {
        this.recipe = this.recipeService.getRecipe(+this.route.snapshot.params['id']);
        this.route.params.subscribe(
            (params: Params) => {
                const tempRecipe = this.recipeService.getRecipe(+params['id']);
                if (tempRecipe == null) {
                    Swal.fire(
                        'Bad link',
                        'No recipe found with id ' + params['id'] + '!',
                        'error'
                    );
                    this.router.navigate(['/recipes']);
                } else {
                    this.recipe = tempRecipe;
                }
            }
        );
    }

    addToShopping() {
        /*this.recipe.ingredients.forEach((ingredient: Ingredient) => {
          this.shoppingListService.saveIngredient(ingredient);
        });*/
        // this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
        this.store.dispatch(new shoppingListActions.AddIngredients(this.recipe.ingredients));
        this.router.navigate(['/shopping-list'], {relativeTo: this.route});
    }

    onRecipeDelete() {
        Swal.fire({
            title: 'Would you like to delete the recipe?',
            text: 'No revert after confirmation!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete!'
        }).then((result) => {
            if (result.value) {
                this.recipeService.deleteRecipe(this.recipe.id);
                Swal.fire(
                    'Recipe Deleted',
                    'The selected Recipe has been deleted successflly!',
                    'success'
                );
                this.router.navigateByUrl('/recipes');
            }

        });
    }
}
