import {RouterModule, Routes} from '@angular/router';
import {RecipesComponent} from './recipes.component';
import {AuthGuard} from '../auth/auth-guard.service';
import {RecipeStartComponent} from '../recipe-start/recipe-start.component';
import {RecipeEditComponent} from './recipe-edit/recipe-edit.component';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';
import {NgModule} from '@angular/core';

const recipesRoutes: Routes = [
    {
        path: '', component: RecipesComponent, canActivate: [AuthGuard], children: [
            {path: '', component: RecipeStartComponent},
            {path: 'new', component: RecipeEditComponent},
            {path: ':id', component: RecipeDetailComponent},
            {path: ':id/edit', component: RecipeEditComponent}
        ]
    }
];

@NgModule({
    imports: [
        // We are using forChild because this module is a child one and a part of the whole application
        // The definition make us able to use routes on the whole application
        RouterModule.forChild(recipesRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class RecipesRoutingModule {

}
