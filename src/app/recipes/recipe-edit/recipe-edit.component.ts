import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ShoppingListService} from '../../shopping-list/shopping-list.service';
import {Ingredient} from '../../shared/Ingredient.model';
import {RecipeService} from '../recipe.service';
import {Recipe} from '../recipe.model';
import Swal from 'sweetalert2';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

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

    form: FormGroup;

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
                    this.initForm();
                } else {
                    this.recipe = new Recipe(0, '', '', '', []);
                }
            }
        );
        console.log((<FormArray> this.form.get('ingredients')));
    }


    hasIngredient(tempIngredient: Ingredient) {
        if (this.recipe.ingredients != null && this.recipe.ingredients.length > 0) {
            return this.recipe.ingredients.filter(ingredient => ingredient.id == tempIngredient.id).length > 0 ? true : false;
        }
        return false;
    }

    initForm() {
        (<FormArray> this.form.get('ingredients')).controls = [];
        this.recipe.ingredients.forEach((ingredient: Ingredient) => {
            (<FormArray> this.form.get('ingredients')).push(
                new FormGroup({
                    name: new FormControl(ingredient.name, [Validators.required,
                        Validators.pattern(/^[a-zA-Z]*$/)]),
                    amount: new FormControl(ingredient.amount, [Validators.required])
                })
            );
        });
        this.form.patchValue({
            name: this.recipe.name,
            description: this.recipe.description,
            imagePath: this.recipe.imagePath,
        });
    }

    onSubmit() {
        if (this.form.valid) {
            let i: number = 2;
            this.recipe.ingredients = [];
            this.recipe.name = this.form.get('name').value;
            this.recipe.description = this.form.get('description').value;
            this.recipe.imagePath = this.form.get('imagePath').value;
            (<FormArray> this.form.get('ingredients')).controls.forEach(
                (control: FormControl) => {
                    this.recipe.ingredients.push(new Ingredient(null, control.value.name, control.value.amount));
                }
            );
            if (this.editMode) {
                this.recipeService.updateRecipe({id: this.id,
                    recipeDetails: {
                        recipeName: this.recipe.name,
                        recipeDescription: this.recipe.description,
                        recipeImagePath: this.recipe.imagePath,
                        recipeIngredients: this.recipe.ingredients
                    }
                });
            } else {
                this.recipeService.saveRecipe(this.recipe);
                this.editMode = true;
            }
            Swal.fire(
                'Data saed',
                'Recipe has been save successflly!',
                'success'
            );
        } else {
            Swal.fire(
                'Bad Form Data',
                'Your input data are invalid, please recheck!',
                'error'
            );
        }
    }

    onIngredientDrop(i: number) {
        (<FormArray> this.form.get('ingredients')).removeAt(i);
    }

    onIngredientAdd() {
        (<FormArray> this.form.get('ingredients')).push(
            new FormGroup({
                name: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]*$/)]),
                amount: new FormControl('', [Validators.required])
            })
        );
    }

    onCancelEdit() {
        this.initForm();
        Swal.fire({
            title: 'Would you like to quit this page?',
            text: 'All changes are ignored!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, quit!'
        }).then((result) => {
            if (result.value) {
                this.router.navigate(['/recipes']);
            }
        });
    }
}
