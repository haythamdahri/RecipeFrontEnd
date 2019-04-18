import {Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Recipe} from '../../recipes/recipe.model';
import {Ingredient} from '../../shared/Ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import {NgForm} from '@angular/forms';
import Swal from 'sweetalert2';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

    @ViewChild('shoppingForm') form: NgForm;
    editMode: boolean = false;
    editedItemIndex: number;
    subscription: Subscription;
    editedItem: Ingredient;

    constructor(private slService: ShoppingListService) {
    }

    ngOnInit() {
        this.subscription = this.slService.editStarted.subscribe(
            (index: number) => {
                this.editedItemIndex = index;
                this.editMode = true;
                this.editedItem = this.slService.getIngredient(index);
                this.form.setValue({
                    name: this.editedItem.name,
                    amount: this.editedItem.amount
                });
            }
        );
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    onSubmit() {
        const value = this.form.value;
        if (this.editMode) {
            this.slService.updateIngredient(this.editedItemIndex, new Ingredient(this.editedItem.id, value.name, value.amount));
        } else {
            this.slService.saveIngredient(new Ingredient(999, value.name, value.amount));
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
                this.slService.deleteIngredient(this.editedItem.id);
                this.editedItemIndex = 0;
                this.editedItem = null;
                this.editMode = false;
                this.form.resetForm();
        });
    }
}
