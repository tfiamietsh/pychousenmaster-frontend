import { Component } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass'
})
export class HomeComponent {
    constructor(private loadingService: LoadingService) { }

    ngAfterViewInit() {
        this.loadingService.toggleState();
    }

    ngOnDestroy() {
        this.loadingService.toggleState();
    }
}
