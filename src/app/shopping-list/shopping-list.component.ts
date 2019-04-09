import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/Ingredient.model';
import {ShoppingListService} from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']

})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[];


  constructor(private ingredientService: ShoppingListService) {}

  ngOnInit() {
    this.ingredients = this.ingredientService.getIngredients();
    this.ingredientService.shoppingAdded.subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        }
    );
  }
}
