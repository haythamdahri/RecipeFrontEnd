import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RecipeBookFrontEnd';

  loadedFeature: string = 'recipe';

  onNavigate(selection: string) {
    this.loadedFeature = selection;
  }
}
