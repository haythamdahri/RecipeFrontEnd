import {Ingredient} from '../shared/Ingredient.model';
import {EventEmitter} from '@angular/core';
import {Subject} from 'rxjs';
import Swal from 'sweetalert2';

export class ShoppingListService {

    editStarted = new Subject<number>();

    private ingredients: Ingredient[] = [
        new Ingredient(90, 'Apples', 5),
        new Ingredient(1745, 'Tomatos', 10)
    ];

    shoppingAdded = new EventEmitter<Ingredient[]>();

    saveIngredient(ingredient: Ingredient) {
        const tempIngredient = Object.assign({}, ingredient);
        this.ingredients.push(tempIngredient);
        this.shoppingAdded.emit(this.ingredients);
    }

    updateIngredient(index: number, ingredient: Ingredient) {
        this.ingredients[index] = ingredient;
        this.shoppingAdded.emit(this.ingredients.slice());
    }

    deleteIngredient(id: number) {
        console.log(this.ingredients.length)
        this.ingredients = this.ingredients.filter(item => item.id !== id);
        console.log(this.ingredients.length);
        this.shoppingAdded.emit(this.ingredients.slice());
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

    getIngredient(index: number): Ingredient | null {
        // return this.ingredients.find(item => item.id === id);
        return this.ingredients[index];
    }
}
