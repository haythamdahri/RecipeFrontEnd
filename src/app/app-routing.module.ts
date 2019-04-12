import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RecipesComponent} from './recipes/recipes.component';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {HomeComponent} from './home/home.component';
import {RecipeDetailComponent} from './recipes/recipe-detail/recipe-detail.component';
import {NotFoundPageComponent} from './not-found-page/not-found-page.component';
import {RecipeStartComponent} from './recipe-start/recipe-start.component';
import {RecipeEditComponent} from './recipes/recipe-edit/recipe-edit.component';

const routes: Routes = [
    {path: '', component: HomeComponent},
    {
        path: 'recipes', component: RecipesComponent, children: [
            {path: '', component: RecipeStartComponent},
            {path: 'new', component: RecipeEditComponent},
            {path: ':id', component: RecipeDetailComponent},
            {path: ':id/edit', component: RecipeEditComponent}
        ]
    },
    {path: 'shopping-list', component: ShoppingListComponent},
    {path: '**', component: NotFoundPageComponent, data: {errorMessage: 'No page found, error 404!'}}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
