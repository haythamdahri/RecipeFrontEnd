import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {HomeComponent} from './core/home/home.component';
import {NotFoundPageComponent} from './core/not-found-page/not-found-page.component';
import {SigninComponent} from './auth/signin/signin.component';
import {SignupComponent} from './auth/signup/signup.component';
import {AuthGuard} from './auth/auth-guard.service';

const routes: Routes = [
    {path: '', component: HomeComponent},
    { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule' },
    {path: 'shopping-list', component: ShoppingListComponent, canActivate: [AuthGuard]},
    {path: 'signin', component: SigninComponent},
    {path: 'signup', component: SignupComponent},
    {path: '**', component: NotFoundPageComponent, data: {errorMessage: 'No page found, error 404!'}}
];

@NgModule({
    // We use forRoot only on the root module of routing
    // If we have an other module which must use routing, we have to use forChild instead if forRoot
    imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
