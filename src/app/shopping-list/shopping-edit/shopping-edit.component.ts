import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Recipe} from '../../recipes/recipe.model';
import {Ingredient} from '../../shared/Ingredient.model';
import {ShoppingListService} from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  ingeredient: Ingredient = new Ingredient(0, '', 0);

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
  }

  onAddItem() {
    this.shoppingListService.saveIngredient(this.ingeredient);
    this.ingeredient = new Ingredient(0, '', 0);
  }

}
