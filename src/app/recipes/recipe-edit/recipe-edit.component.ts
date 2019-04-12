import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ShoppingListService} from '../../shopping-list/shopping-list.service';
import {Ingredient} from '../../shared/Ingredient.model';
import {RecipeService} from '../recipe.service';
import {Recipe} from '../recipe.model';
import Swal from 'sweetalert2';
import has = Reflect.has;

@Component({
    selector: 'app-recipe-edit',
    templateUrl: './recipe-edit.component.html',
    styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

    id: number;
    recipeName: string;
    recipeDescription: string;
    recipeImagePath: string;
    ingredients: Ingredient[];
    editMode: boolean = false;

    constructor(private route: ActivatedRoute,
                private shoppingListService: ShoppingListService,
                private recipeService: RecipeService,
                private router: Router) {
    }

    ngOnInit() {

        this.route.params.subscribe(
            (params: Params) => {
                this.id = +params['id'];
                this.editMode = params['id'] != null;
                if (this.editMode) {
                    const recipe: Recipe = this.recipeService.getRecipe(this.id);
                    this.recipeName = recipe.name;
                    this.recipeDescription = recipe.description;
                    this.recipeImagePath = recipe.imagePath;
                    this.ingredients = recipe.ingredients;
                    if (recipe == null) {
                        Swal.fire(
                            'Bad link',
                            'No recipe found with id ' + this.id + '!',
                            'error'
                        );
                        this.router.navigate(['/recipes']);
                    }
                }
            }
        );

    }


    hasIngredient(tempIngredient: Ingredient) {
        if (this.ingredients != null && this.ingredients.length > 0) {
            return this.ingredients.filter(ingredient => ingredient.id == tempIngredient.id).length > 0 ? true : false;
        }
        return false;
    }

    addIngredient(ingredient: Ingredient) {
        if (!this.hasIngredient(ingredient)) {
            this.ingredients.push(ingredient);
        }
    }

    saveLocalRecipe() {
        if (this.editMode) {
            this.recipeService.updateRecipe({
                id: this.id,
                recipeDetails: {
                    recipeName: this.recipeName,
                    recipeDescription: this.recipeDescription,
                    recipeImagePath: this.recipeImagePath,
                    recipeIngredients: this.ingredients
                }
            });
            Swal.fire(
                'Updated',
                'The recipe has been updated successflly!',
                'success'
            );
        } else {
            this.recipeService.saveRecipe(new Recipe(99, this.recipeName, this.recipeDescription, this.recipeImagePath, this.ingredients));
            Swal.fire(
                'Saved',
                'The recipe has been saved successflly!',
                'success'
            );
        }
        this.router.navigate(['/recipes']);
    }
}
