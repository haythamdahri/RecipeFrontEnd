import {Component, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {ActivatedRoute, Data, Params, Router} from '@angular/router';
import {Ingredient} from '../../shared/Ingredient.model';
import Swal from "sweetalert2";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;


  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    this.recipe = this.recipeService.getRecipe(+this.route.snapshot.params['id']);
    this.route.params.subscribe(
        (params: Params) => {
          const tempRecipe = this.recipeService.getRecipe(+params['id']);
          if( tempRecipe == null ){
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
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
    this.router.navigate(['/shopping-list'], {relativeTo: this.route});
  }

}
