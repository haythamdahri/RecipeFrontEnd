import {Action} from '@ngrx/store';
import {Ingredient} from '../../shared/Ingredient.model';

// We are exporting a const property to define type of action which must do
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const START_EDIT = 'START_EDIT';
export const STOP_EDIT = 'STOP_EDIT';

// This class define the add ingredient action
export class AddIngredient implements Action {
    readonly type = ADD_INGREDIENT;

    constructor(public payload: Ingredient) {
    }
}

export class AddIngredients implements Action {
    readonly type = ADD_INGREDIENTS;

    constructor(public payload: Ingredient[]) {
    }

}

export class UpdateIngredient implements Action {
    readonly type = UPDATE_INGREDIENT;

    constructor(public payload: Ingredient) {
    }
}

export class DeleteIngredient implements Action {
    readonly type = DELETE_INGREDIENT;
}


export class StartEdit implements Action {
    readonly type = START_EDIT;

    constructor(public payload: number){}
}

export class StopEdit implements Action {
    readonly type = STOP_EDIT;

}


// We are export a type assigning it AddIngredient
export type Actions = AddIngredient | AddIngredients | UpdateIngredient | DeleteIngredient | StartEdit | StopEdit;

