import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/Ingredient.model';
import {NgForm} from '@angular/forms';
import Swal from 'sweetalert2';
import {Subscription} from 'rxjs';
import * as shoppingListActions from '../store/shopping-list.actions';
import {Store} from '@ngrx/store';
import * as fromShoppingList from '../store/shopping-list.reducers';
import * as ShoppingListActions from '../store/shopping-list.actions';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

    @ViewChild('shoppingForm') form: NgForm;
    editMode: boolean = false;
    subscription: Subscription;
    editedItem: Ingredient;


    constructor(private store: Store<fromShoppingList.AppState>) {
    }

    ngOnInit() {
        this.subscription = this.store.select('shoppingList').subscribe(
            (data) => {
                if (data.editIngredientIndex > -1) {
                    this.editedItem = data.editedIngredient;
                    this.editMode = true;
                    this.form.setValue({
                        name: this.editedItem.name,
                        amount: this.editedItem.amount
                    });
                }
            }
        );
        // this.subscription = this.slService.editStarted.subscribe(
        //     (index: number) => {
        //         this.editMode = true;
        //         this.store.dispatch(new shoppingListActions.StartEdit(index));
        //         this.form.setValue({
        //             name: this.editedItem.name,
        //             amount: this.editedItem.amount
        //         });
        //     }
        // );
    }

    ngOnDestroy(): void {
        this.store.dispatch(new ShoppingListActions.StopEdit());
        this.subscription.unsubscribe();
    }

    onSubmit() {
        const value = this.form.value;
        if (this.editMode) {
            this.store.dispatch(new shoppingListActions.UpdateIngredient(new Ingredient(this.editedItem.id, value.name, value.amount)));
        } else {
            this.store.dispatch(new shoppingListActions.AddIngredient(new Ingredient(999, value.name, value.amount)));
        }
        this.form.reset();
        this.editMode = false;
        this.editedItem = null;
    }

    clearForm(form: NgForm) {
        form.reset();
        this.editedItem = null;
        this.editMode = false;
    }

    onItemDelete() {
        let remove = false;
        Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            // this.slService.deleteIngredient(this.editedItem.id);
            this.store.dispatch(new shoppingListActions.DeleteIngredient());
            this.editedItem = null;
            this.editMode = false;
            this.form.resetForm();
        });
    }
}
