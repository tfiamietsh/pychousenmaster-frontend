import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass'
})
export class HomeComponent {
    trueTitle: string[] = "Py挑戦マスター".split('');
    chars: string[] = this.trueTitle.join('').split('');
    randomizerEnabled: boolean = true;
    timeout: number = 50;

    ngOnInit() {
        //this.updateTitle();
    }

    get title() {
        return this.chars.join('');
    }

    private getRandomChar(a: number, b: number) {
        return String.fromCharCode(Math.floor(Math.random() * (b - a + 1)) + a);
    }

    private getRandomTitle(): string[] {
        let chars: string[] = [], i: number = 0;
        chars[i++] = this.getRandomChar(65, 90);
        chars[i++] = this.getRandomChar(97, 122);
        for (; i < this.chars.length; i++)
            chars[i] = this.getRandomChar(0x4E00, 0x9FFF);
        return chars;
    }

    private setCharAt(i: number, chars: string[]) {
        setTimeout(() => {
            if (i < this.chars.length) {
                this.chars[i] = chars[i];
                this.setCharAt(i + 1, chars);
            }
        }, this.timeout);
    }
    
    private updateTitle() {
        setTimeout(() => {
            this.setCharAt(0, this.randomizerEnabled ? this.getRandomTitle() : this.trueTitle);
            this.updateTitle();
        }, this.timeout);
    }

    toggleRandomizer() {
        this.randomizerEnabled = !this.randomizerEnabled;
    }
}
