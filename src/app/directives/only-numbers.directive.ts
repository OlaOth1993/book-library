import { Directive, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
    selector: '[appNumbersOnly]',
    standalone: true,
})
export class NumberDirective {

    @Output() valueChange = new EventEmitter()
    constructor(private _el: ElementRef) { }

    @HostListener('input', ['$event']) onInputChange(event: { stopPropagation: () => void; }) {
        const initalValue = this._el.nativeElement.value;
        const newValue = initalValue.replace(/[^0-9]*/g, '');
        this._el.nativeElement.value = newValue;
        this.valueChange.emit(newValue);
        if (initalValue !== this._el.nativeElement.value) {
            event.stopPropagation();
        }
    }

}