import {Ingredient} from '../shared/Ingredient.model';
import {EventEmitter} from '@angular/core';

export class ShoppingListService {
    private ingredients: Ingredient[] = [
        new Ingredient(80, 'Apples', 5),
        new Ingredient(66, 'Tomatos', 10)
    ];

    shoppingAdded = new EventEmitter<Ingredient[]>();

    saveIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.shoppingAdded.emit(this.ingredients);
    }

    saveIngredients(ingredients: Ingredient[]) {
        /*ingredients.forEach((ingredient: Ingredient) => {
           this.ingredients.push(ingredient);
        });
        for( const ingredient of ingredients ) {
            this.ingredients.push(ingredient);
        }*/
        this.ingredients.push(...ingredients);
        this.shoppingAdded.emit(this.ingredients);
    }

    getIngredients() {
        return this.ingredients.slice();
    }
}
