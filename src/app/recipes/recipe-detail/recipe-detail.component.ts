import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {ShoppingListService} from '../../shopping-list/shopping-list.service';
import {Ingredient} from '../../shared/Ingredient.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  @Input() recipe: Recipe;


  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
  }

  addToShopping() {
    /*this.recipe.ingredients.forEach((ingredient: Ingredient) => {
      this.shoppingListService.saveIngredient(ingredient);
    });*/
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

}
