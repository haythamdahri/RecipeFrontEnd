import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ShoppingListService} from '../../shopping-list/shopping-list.service';
import {Ingredient} from '../../shared/Ingredient.model';
import {RecipeService} from '../recipe.service';
import {Recipe} from '../recipe.model';
import Swal from 'sweetalert2';
import {Form, FormArray, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';

@Component({
    selector: 'app-recipe-edit',
    templateUrl: './recipe-edit.component.html',
    styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

    id: number;
    @ViewChild('name') recipeName: ElementRef;
    @ViewChild('description') recipeDescription: ElementRef;
    @ViewChild('image') recipeImagePath: ElementRef;
    recipeIngredients: Ingredient[];
    editMode: boolean = false;

    form : FormGroup;

    recipe: Recipe;

    constructor(private route: ActivatedRoute,
                private shoppingListService: ShoppingListService,
                private recipeService: RecipeService,
                private router: Router) {
    }

    ngOnInit() {
        this.form = new FormGroup({
            name: new FormControl('', Validators.required),
            description: new FormControl('', [Validators.required]),
            imagePath: new FormControl('', [Validators.required]),
            ingredients: new FormArray([])
        });

        this.route.params.subscribe(
            (params: Params) => {
                this.id = +params['id'];
                this.editMode = params['id'] != null;
                if (this.editMode) {
                    this.recipe = this.recipeService.getRecipe(this.id);
                    if (this.recipe == null) {
                        Swal.fire(
                            'Bad link',
                            'No recipe found with id ' + this.id + '!',
                            'error'
                        );
                        this.router.navigate(['/recipes']);
                    }
                    this.form.setValue({
                        name: this.recipe.name,
                        description: this.recipe.description,
                        imagePath: this.recipe.imagePath,
                        ingredients: []
                    });
                    let controls: FormControl[];
                    this.recipe.ingredients.forEach((ingredient: Ingredient) => {
                        (<FormArray>this.form.get('ingredients')).push(new FormControl(ingredient.name, [Validators.required]));
                    });
                } else {
                    this.recipe = new Recipe(0, '', '', '', []);
                }
            }
        );

    }


    hasIngredient(tempIngredient: Ingredient) {
        if (this.recipe.ingredients != null && this.recipe.ingredients.length > 0) {
            return this.recipe.ingredients.filter(ingredient => ingredient.id == tempIngredient.id).length > 0 ? true : false;
        }
        return false;
    }

    checkIngredient(ingredient: Ingredient) {
        if( this.hasIngredient(ingredient) ) {
            this.recipe.ingredients = this.recipe.ingredients.filter(item => item.id !== ingredient.id);
        } else {
            this.recipe.ingredients.push(ingredient);
        }
    }

    onSubmit() {

    }

    onIngredientDrop(i: number) {
        (<FormArray>this.form.get('ingredients')).removeAt(i);
    }

    onIngredientAdd() {
        (<FormArray>this.form.get('ingredients')).push(new FormControl('', [Validators.required]));
    }
}
