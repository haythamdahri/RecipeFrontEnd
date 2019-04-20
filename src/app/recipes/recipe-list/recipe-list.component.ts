import {Component, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {Subscription} from 'rxjs';
import {DataStorageService} from '../../shared/data-storage.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes: Recipe[];
  subscription: Subscription;

  constructor(private recipeService: RecipeService,
              private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.dataStorageService.fetchRecipes();
    this.subscription = this.recipeService.recipesChanges.subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
        }
    );
  }

  ngOnDestroy(): void {
    if( this.subscription != null ) {
      this.subscription.unsubscribe();
    }

  }

}
