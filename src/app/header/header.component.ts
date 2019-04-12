import {Component, EventEmitter, Output} from '@angular/core';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {

    search: string = '';

    constructor(private router: Router) {

    }

    onSearch(event: Event) {
        console.log((<HTMLInputElement> event.target).value);
        this.search = (<HTMLInputElement> event.target).value;
    }

    onDisplaySearch() {
        this.router.navigate(['/'], {
            queryParams: {search: this.search},
            fragment: 'loading',
            preserveFragment: true,
            preserveQueryParams: true
        });
    }
}
