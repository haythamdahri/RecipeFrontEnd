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


  constructor(private slService: ShoppingListService) {}

  ngOnInit() {
    this.ingredients = this.slService.getIngredients();
    this.slService.shoppingAdded.subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        }
    );
  }

    onEditItem(i: number) {
        this.slService.editStarted.next(i);
    }
}
