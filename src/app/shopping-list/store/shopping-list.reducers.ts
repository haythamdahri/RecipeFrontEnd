import * as ShoppingListActions from './shopping-list.actions';

import {Ingredient} from '../../shared/Ingredient.model';

export interface State {
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editIngredientIndex: number;
}

export interface AppState {
    shoppingList: State;
}

const initialState = {
    ingredients: [
        new Ingredient(90, 'Apples', 5),
        new Ingredient(1745, 'Tomatos', 10)
    ],
    editedIngredient: null,
    editIngredientIndex: -1,
};

// We are exporting the function which will receive two arguments
// state argument
/*
action argument will be of our type definition to precise the type of action which we will
receive(Ingredient<create, update, read or delete> in this case)
*/
export function ShoppingListReducers(state = initialState, action: ShoppingListActions.Actions) {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            console.log(action.payload);
            return {
                state,
                ingredients: [...state.ingredients, action.payload]
            };
        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                state,
                ingredients: [...state.ingredients, ...action.payload],
                editedIngredient: null,
                editIngredientIndex: -1
            };
        case ShoppingListActions.UPDATE_INGREDIENT:
            const ingredient = state.ingredients[action.payload.id];
            // This object will replace the old one with the new one
            const updatedIngredient = {
                ...ingredient,
                ...action.payload
            };
            const ingredients = state.ingredients.map((item) => {
                if (item.id === action.payload.id) {
                    item = action.payload;
                }
                return item;
            });
            return {
                state,
                ingredients: [...ingredients],
                editedIngredient: null,
                editIngredientIndex: -1
            };
        case ShoppingListActions.DELETE_INGREDIENT:
            const ingredientsTemp: Ingredient[] = state.ingredients.filter(item => item.id !== state.editIngredientIndex);
            return {
                ...state,
                ingredients: [...ingredientsTemp],
                editedIngredient: null,
                editIngredientIndex: -1
            };
        case ShoppingListActions.START_EDIT:
            const storeEditedIngredient = {...state.ingredients.find(item => item.id === action.payload)};
            return {
                ...state,
                editIngredientIndex: action.payload,
                editedIngredient: storeEditedIngredient
            };
        case ShoppingListActions.STOP_EDIT:
            return {
                ...state,
                editedIngredient: null,
                editIngredientIndex: -1
            };
        default:
            return state;
    }
}
