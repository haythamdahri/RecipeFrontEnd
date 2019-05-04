import {NgModule} from '@angular/core';
import {RecipeEditComponent} from './recipe-edit/recipe-edit.component';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';
import {RecipeItemComponent} from './recipe-list/recipe-item/recipe-item.component';
import {RecipeListComponent} from './recipe-list/recipe-list.component';
import {RecipeStartComponent} from '../recipe-start/recipe-start.component';
import {RecipesComponent} from './recipes.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RecipesRoutingModule} from './recipes-routing.module';
import {DropdownDirective} from '../shared/dropdown.directive';

// After adding all declarations, wewill remove them from app.module.ts because we will export the whole module
/*For the RecipeService, we will let it on the app module
    because we need a global instance which we will use on other components */
// We moved ReactiveFormsModule to this module because we only need it inside the editComponent and not for other components
// DropdownDirective is moved too because it's only used inside this module components
@NgModule({
    declarations: [
        RecipesComponent,
        RecipeEditComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        RecipeListComponent,
        RecipeStartComponent,
        DropdownDirective
    ],
    imports: [
        // Common module allow us to use common features such as ngClass, ngFor in our Module (Necessary to get access to these features)
        CommonModule,
        ReactiveFormsModule,
        RecipesRoutingModule
    ],
    exports: [
        ReactiveFormsModule,
        RecipesRoutingModule
    ]
})
export class RecipesModule {

}
