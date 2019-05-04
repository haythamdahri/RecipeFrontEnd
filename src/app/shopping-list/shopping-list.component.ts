import {Component, OnInit} from '@angular/core';
import {Ingredient} from '../shared/Ingredient.model';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromShoppingList from './store/shopping-list.reducers';
import * as ShoppingListActions from './store/shopping-list.actions';

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.css']

})
export class ShoppingListComponent implements OnInit {

    shoppingListState: Observable<{ ingredients: Ingredient[] }>;


    constructor(private store: Store<fromShoppingList.AppState>) {
    }

    ngOnInit() {
        this.shoppingListState = this.store.select('shoppingList');
    }

    onEditItem(i: number) {
        // this.slService.editStarted.next(i);
        this.store.dispatch(new ShoppingListActions.StartEdit(i));
    }
}
