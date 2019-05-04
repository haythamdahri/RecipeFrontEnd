import {NgModule} from '@angular/core';
import {HomeComponent} from './home/home.component';
import {HeaderComponent} from './header/header.component';
import {AppRoutingModule} from '../app-routing.module';
import {NotFoundPageComponent} from './not-found-page/not-found-page.component';
import {CommonModule} from '@angular/common';
import {RecipeService} from '../recipes/recipe.service';
import {DataStorageService} from '../shared/data-storage.service';
import {AuthGuard} from '../auth/auth-guard.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from '../shared/auth.interceptor';
import {LoggingInterceptor} from '../shared/logging.interceptor';

@NgModule({
    declarations: [
        HomeComponent,
        HeaderComponent,
        NotFoundPageComponent
    ],
    imports: [
        CommonModule,
        // We are importing AppRoutingModule because the path to HomeComponent is declared there
        AppRoutingModule
    ],
    exports: [
        /*We are exporting AppRoutingModule because we have the path to home
        component in the app routing so that we will use the routes there*/
        AppRoutingModule,
        // We are exporting HeaderComponent because we will use the header selector in the app component
        HeaderComponent,
        NotFoundPageComponent
    ],
    providers: [
        RecipeService, // We added the recipeService here in order to keep data available globaly either if we changed the page
        DataStorageService,
        AuthGuard, // This service is used to protect access to recipes with all the children routes in case of anonymous user
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true}
    ]
})
export class CoreModule {
}
