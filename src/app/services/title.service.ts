import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

export const siteName: string = 'Python Challenge Master';

@Injectable({ providedIn: 'root' })
export class TitleService {
    constructor(private title: Title) { }

    setTitle(preTitle: string, postTitle: string = '') {
        this.title.setTitle(`${preTitle} - ${siteName}${postTitle ? ` ${postTitle}`: ''}`);
    }
}
