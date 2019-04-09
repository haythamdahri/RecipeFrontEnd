import {Directive, ElementRef, HostBinding, HostListener, OnInit, Renderer2} from '@angular/core';

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit{



    @HostBinding('class.open') isOpen: boolean;

    @HostListener('click') mouseClick(eventData: Event) {
        this.isOpen = !this.isOpen;
    }

    ngOnInit() {
        console.debug("HI");
    }

}
