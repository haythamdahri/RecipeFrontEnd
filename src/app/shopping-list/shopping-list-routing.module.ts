import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ShoppingListComponent} from './shopping-list.component';
import {AuthGuard} from '../auth/auth-guard.service';

const shoppingListRoutes: Routes = [
    {path: 'shopping-list', component: ShoppingListComponent, canActivate: [AuthGuard]},
];


@NgModule({
    imports: [
        RouterModule.forChild(shoppingListRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class ShoppingListRoutingModule {

}
