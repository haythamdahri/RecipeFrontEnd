import {Component, EventEmitter, Output} from '@angular/core';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{

  search: string = '';

  @Output() featureSelected = new EventEmitter<string>();

  constructor() {

  }

  onSearch(event: Event) {
    console.log((<HTMLInputElement>event.target).value);
    this.search = (<HTMLInputElement>event.target).value;
  }

  onDisplaySearch() {
    Swal.fire({
      title: 'Success!',
      text: 'You typed ' + this.search,
      type: 'success',
      confirmButtonText: 'Cool'
    });
  }

  onSelect(select: string){
    this.featureSelected.emit(select);
  }
}
