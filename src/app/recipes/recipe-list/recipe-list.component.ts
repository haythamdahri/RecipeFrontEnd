import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  @Output() recipeSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe('Antigone', 'Antigone picks up in the same (uber-dismal) place that Oedipus at Colonus leaves off. Oedipus has just passed away in Colonus, and Antigone and her sister decide to return to Thebes with the intention of helping their brothers, Eteocles and Polyneices, avoid a prophecy that predicts they will kill each other in a battle for the throne of Thebes.', 'https://media1.shmoop.com/media/covers/literature/lit00204.jpg'),
    new Recipe('My Father\'s Glory\n', 'My Father\'s Glory (French: La Gloire de mon père) is a 1957 autobiographical novel by Marcel Pagnol. Its sequel is My Mother\'s Castle. It is the first of four volumes in Pagnol\'s Souvenirs d\'enfance series. It is also a 1990 film based on the novel, and directed by Yves Robert.', 'https://upload.wikimedia.org/wikipedia/en/thumb/2/2d/My_Father%27s_Glory.jpg/220px-My_Father%27s_Glory.jpg'),
    new Recipe('The Last Day of a Condemned Man\n', 'The Last Day of a Condemned Man (French: Le Dernier Jour d\'un Condamné) is a short novel by Victor Hugo first published in 1829. The novel recounts the thoughts of a man condemned to die. Victor Hugo wrote this novel to express his feelings that the death penalty should be abolished.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/HugoLastDayCondemnedMan.jpg/220px-HugoLastDayCondemnedMan.jpg')
  ];

  constructor() { }

  ngOnInit() {
  }

  onSelected(recipe: Recipe) {
    this.recipeSelected.emit(recipe);
  }

}
