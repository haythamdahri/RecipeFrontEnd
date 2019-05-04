import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {AuthModule} from './auth/auth.module';
import {ShoppingListModule} from './shopping-list/shopping-list.module';
import {CoreModule} from './core/core.module';
import {ShoppingListReducers} from './shopping-list/store/shopping-list.reducers';
import {AuthReducer} from './auth/store/auth.reducers';
import {StoreModule} from '@ngrx/store';


@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        // The BrowserModule is actually needed only in app module because it contains CommonModule
        // and other modules which are only necessary for the application start
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        AuthModule,
        ShoppingListModule,
        CoreModule,
        StoreModule.forRoot({shoppingList: ShoppingListReducers}, {user: })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
