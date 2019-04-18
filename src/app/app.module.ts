import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import {DropdownDirective} from './shared/dropdown.directive';
import {ShoppingListService} from './shopping-list/shopping-list.service';
import { HomeComponent } from './home/home.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeDetailComponent,
    RecipeListComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    DropdownDirective,
    HomeComponent,
    NotFoundPageComponent,
    RecipeStartComponent,
    RecipeEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
      ReactiveFormsModule
  ],
  providers: [
      ShoppingListService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
