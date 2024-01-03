import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingService {
    private isLoading: boolean = true;

    setState(state: boolean) {
        this.isLoading = state;
    }

    getState() {
        return this.isLoading;
    }
}
