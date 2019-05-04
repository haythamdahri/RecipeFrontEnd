import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  LINKEDIN_URL: string = 'https://www.linkedin.com/in/haytham-dahri-645795155/';

  constructor() { }

  ngOnInit() {
  }

}
