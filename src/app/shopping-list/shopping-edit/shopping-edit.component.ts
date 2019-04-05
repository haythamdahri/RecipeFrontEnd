import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Recipe} from '../../recipes/recipe.model';
import {Ingredient} from '../../shared/Ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  ingeredient: Ingredient = new Ingredient('', 0);
  @Output() shoppingAdded = new EventEmitter<Ingredient>();

  constructor() { }

  ngOnInit() {
  }

  onAddItem() {
    this.shoppingAdded.emit(this.ingeredient);
    this.ingeredient = new Ingredient('', 0);
  }

}
