
import { Component, Input, Output, EventEmitter, ViewChild, Directive, ElementRef } from '@angular/core'; ;

@Directive({
  selector: '[loading]'
 })
export class LoadingDirective {
    
    constructor(private element: ElementRef) {
        this.iDiv = document.createElement("div");
        this.loadingImage = document.createElement("img");
        
        this.loadingImage.src = "assets/img/loading3.gif"
        this.loadingImage.style.height= "10em";
        this.loadingImage.style.width = "10em";

        this.iDiv.style.display = "flex";
        this.iDiv.style.justifyContent = "center"
        this.iDiv.style.alignItems = "center";
        this.iDiv.style.position = "absolute";
        this.iDiv.style.top = "0px";
        this.iDiv.style.left = "0px";
        this.iDiv.style.width = "100%";
        this.iDiv.style.height = "100%";
        this.iDiv.style.background = "rgba(220, 220, 220, 0.7)";
        this.iDiv.style.zIndex = "100";
        this.iDiv.appendChild(this.loadingImage);
   }   
    
    _loading: boolean = false;
    iDiv: HTMLDivElement = null;
    loadingImage: HTMLImageElement = null
    originalPosition: string ;
    
//    @Input('loading') set loading(value: boolean) {
//        let style = window.getComputedStyle(this.element.nativeElement);
//        let pos = style.getPropertyValue('position');
//        
//        if(value) {
//            if(pos == "static") {
//                this.originalPosition = pos;
//                this.element.nativeElement.style.position = "relative";
//            }
//            this.element.nativeElement.appendChild(this.iDiv);
//        }
//        else {
//            if (this._loading) {
//                this.element.nativeElement.style.position = this.originalPosition;
//                this.element.nativeElement.removeChild(this.iDiv);
//            }
//        }
//        
//        this._loading = value;
//    }    
    
    @Input('loading') set loading(value: boolean) {
        let style = window.getComputedStyle(this.element.nativeElement);
        let pos = style.getPropertyValue('position');
        
        if(value) {
            document.body.appendChild(this.iDiv);
        }
        else {
            if (this._loading) {
                document.body.removeChild(this.iDiv);
            }
        }
        
        this._loading = value;
    }    
}  