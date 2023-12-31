import { Component, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTabGroup } from '@angular/material/tabs';
import { Testcase } from 'src/app/helpers/testcase';
import { ProblemService } from 'src/app/services/problem.service';
import { TagsService } from 'src/app/services/tags.service';

@Component({
  selector: 'new-problem-dialog',
  templateUrl: './new-problem-dialog.component.html',
  styleUrl: './new-problem-dialog.component.sass'
})
export class NewProblemDialogComponent {
    difficulty: string;
    titleInput: HTMLInputElement | any;
    descriptionInput: HTMLInputElement | any;
    solutionInput: HTMLInputElement | any;
    tagIdxMap: any;
    mask: number = 0;
    testcases: Testcase[] = [];
    testcaseIdx: number = 0;
    @ViewChild('tctg') testcasesTabGroup: MatTabGroup;

    constructor(private dialogRef: MatDialogRef<NewProblemDialogComponent>,
        private tagsService: TagsService, private problemService: ProblemService) { }

    ngOnInit() {
        this.titleInput = document.getElementById('title');
        this.descriptionInput = document.getElementById('desc');
        this.solutionInput = document.getElementById('sol');
        this.tagsService.getTags().subscribe(response => {
            this.tagIdxMap = response['tagIdxMap'];
        });
    }

    get tags() {
        return Object.keys(this.tagIdxMap);
    }

    get testcase() {
        return this.testcases[this.testcaseIdx];
    }

    get addTestcaseStyle() {
        return this.testcases.length == 0 ? 'margin-bottom: 15px' : '';
    }

    kbEvent(event: KeyboardEvent, elem: HTMLInputElement) {
        if (event.key == 'Tab') {
            const position = elem.selectionStart;
            const before = elem.value.substring(0, position);
            const after = elem.value.substring(position, elem.value.length);
            elem.value = before + '\t' + after;
            elem.selectionStart = elem.selectionEnd = position + 1;
            event.preventDefault();
        }
    }
    
    processTag(tag: string) {
        if (this.mask & this.tagIdxMap[tag])
            this.mask ^= this.tagIdxMap[tag];
        else
            this.mask |= this.tagIdxMap[tag];
    }

    tabChange(event: any) {
        if (this.testcasesTabGroup.selectedIndex == this.testcases.length) {
            this.newTestcase();
            event.preventDefault();
        }
        this.testcaseIdx = this.testcasesTabGroup.selectedIndex;
    }

    newTestcase() {
        const solution: string = this.solutionInput.value;
        const args: string[] = solution.substring(solution.indexOf('(') + 1, solution.indexOf(')')).split(',');
        this.testcases.push({
            input: Object.fromEntries(args.map(s => {
                const idx = s.indexOf(':');
                const res = idx == -1 ? s : s.substring(0, idx);
                return [res.replaceAll(' ', ''), ''];
            })),
            output: ''
        });
        let intervalId = setInterval(_ => {
            this.testcasesTabGroup.selectedIndex = this.testcases.length - 1;
            clearInterval(intervalId);
        }, 1);
    }

    modifyTestcaseInput(key: string, value: string) {
        this.testcase.input[key] = value;
    }

    modifyTestcaseOutput(value: string) {
        this.testcase.output = value;
    }

    confirm() {
        this.problemService.newProblem(JSON.stringify({
            title: this.titleInput.value,
            difficulty: this.difficulty,
            description: this.descriptionInput.value,
            solution: this.solutionInput.value,
            testcases: this.testcases,
            tagsMask: this.mask
        })).subscribe(_ => this.close());
    }

    close() {
        this.dialogRef.close();
    }
}
