import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingService {
    private isLoading: boolean = true;

    toggleState() {
        this.isLoading = !this.isLoading;
    }

    getState() {
        return this.isLoading;
    }
}
