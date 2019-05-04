import {EventEmitter, Injectable} from '@angular/core';
import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/Ingredient.model';
import Swal from 'sweetalert2';
import {HttpClient} from '@angular/common/http';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducers';
import {Store} from '@ngrx/store';

@Injectable()
export class RecipeService {


    private availableIngredientId: number = 7;
    private availableRecipeId: number = 4;

    recipesChanges = new EventEmitter<Recipe[]>();
    private recipes: Recipe[] = [];

    constructor(private http: HttpClient,
                private store: Store<fromShoppingList.AppState>) {
    }

    getRecipe(id: number) {
        return this.recipes.find(recipe => recipe.id == id);
    }

    saveRecipe(recipe: Recipe) {
        recipe.id = this.availableRecipeId++;
        this.recipes.push(recipe);
        this.recipesChanges.emit(this.recipes);
    }

    getRecipes() {
        return this.recipes.slice();
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        ingredients.forEach(
            (ingredient: Ingredient) => {
                ingredient.id = ++this.availableIngredientId;
            }
        );
        this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
        Swal.fire(
            'Good job!',
            'Ingredients added to shopping list successflly',
            'success'
        );
    }

    updateRecipe(param: { id: number; recipeDetails: { recipeName: string; recipeDescription: string; recipeImagePath: string; recipeIngredients: Ingredient[] } }) {
        let recipe = this.getRecipe(param.id);
        if (recipe != null) {
            recipe.name = param.recipeDetails.recipeName;
            recipe.description = param.recipeDetails.recipeDescription;
            recipe.ingredients = param.recipeDetails.recipeIngredients;
            recipe.imagePath = param.recipeDetails.recipeImagePath;
        }
        this.recipesChanges.emit(this.recipes);
    }

    deleteRecipe(id: number) {
        this.recipes = this.recipes.filter(item => item.id !== id);
        this.recipesChanges.emit(this.recipes);
    }

    updateRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanges.next(this.recipes);
    }


}
