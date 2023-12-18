import { Component } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProblemService } from 'src/app/services/problem.service';
import { Problem } from 'src/app/helpers/problem';
import { Submission } from 'src/app/helpers/submission';
import hljs from 'highlight.js/lib/core';
import python from 'highlight.js/lib/languages/python';
import { User } from 'src/app/helpers/user';
import { Testcase } from 'src/app/helpers/testcase';

@Component({
  selector: 'problem',
  templateUrl: './problem.component.html',
  styleUrl: './problem.component.sass'
})
export class ProblemComponent {
    problem: Problem;
    colors: string[] = ['deepskyblue', 'darkorange', 'crimson'];
    difficulties: string[] = ['Easy', 'Medium', 'Hard'];
    states: string[] = ['Solved', 'Attempted', ''];
    stateIcons: string[] = ['panorama_fish_eye', 'change_history'];
    testcaseIdx: number = 0;
    results: string[] = [];
    resultIdx: number = 0;
    status: string = '';
    stColumns: string[] = ['status', 'runtime', 'memory'];
    editorDiv: HTMLDivElement | any;

    constructor(private authService: AuthenticationService, private router: Router,
        private route: ActivatedRoute, private problemService: ProblemService) { }

    ngOnInit() {
        this.editorDiv = document.getElementsByClassName('editor-div')[0];
        hljs.registerLanguage('python', python);

        let title = this.route.snapshot.paramMap.get('title');
        let user_id = this.authService.user?.id;
        this.problemService.getProblemByTitle(title, user_id ? user_id : '-1')
            .subscribe(problem => { this.problem = problem; });
    }

    get difficulty(): string {
        return this.difficulties[this.problem.difficulty];
    }

    get difficultyStyle(): string {
        return 'color:' + this.colors[this.problem.difficulty];
    }

    get state(): string {
        return this.states[this.problem.state];
    }

    get stateStyle(): string {
        return 'color:' + this.colors[this.problem.state];
    }

    get stateIcon(): string {
        return this.stateIcons[this.problem.state];
    }

    get ar(): string {
        let value = 0;
        if (this.problem.totalSubmissions != 0)
            value = 100 * this.problem.totalAccepted / this.problem.totalSubmissions;
        return value.toFixed(1) + '%';
    }

    get user(): User | null {
        return this.authService.user;
    }

    like() {
        if (this.user) {
            //  TODO
        }
    }

    dislike() {
        if (this.user) {
            //  TODO
        }
    }
    
    problemTabChange(event: MatTabChangeEvent) {
        if (event.index == 1)
            this.router.navigate(['/discussion']);
    }

    setTestcaseIdx(i: number) {
        this.testcaseIdx = i;
    }

    get testcase(): Testcase {
        return this.problem.testcases[this.testcaseIdx];
    }

    tcCaseColor(i: number): string {
        return i == this.testcaseIdx ? 'primary' : '';
    }

    setResultIdx(i: number) {
        this.resultIdx = i;
    }

    get result(): Testcase {
        return this.problem.testcases[this.resultIdx];
    }

    get expected(): string {
        return this.results[this.resultIdx];
    }

    rCaseColor(i: number): string {
        return i == this.resultIdx ? 'primary' : '';
    }

    statusColor(status: string): string {
        const idx = status === 'Accepted' ? 0 : 2;
        return `color: ${this.colors[idx]}`;
    }

    runtime(submission: Submission): string {
        return submission.runtime < 0 ? 'N/A' : submission.runtime + 'ms';
    }

    memory(submission: Submission): string {
        return submission.memory < 0 ? 'N/A' : submission.memory + 'MB';
    }

    caseDotStyle(i: number): string {
        const idx = this.problem.testcases[i].output == this.results[i] ? 0 : 2;
        return `font-size: 8px; color: ${this.colors[idx]}`;
    }

    resetCode() {
        //  TODO
    }

    retrieveCode() {
        //  TODO
    }

    run() {
        if (this.user) {
            //  TODO
        }
    }

    submit() {
        if (this.user) {
            //  TODO
        }
    }

    openDialog() {
        //  TODO
    }

    select(submission: Submission) {
        this.editorDiv.innerText = submission.code;
        this.highlight();
    }

    private static getTextNodeAtPosition(root: Node, index: number) {
        const NODE_TYPE = NodeFilter.SHOW_TEXT;
        var treeWalker = document.createTreeWalker(root, NODE_TYPE, (elem) => {
            if (index > elem.textContent.length) {
                index -= elem.textContent.length;
                return NodeFilter.FILTER_REJECT
            }
            return NodeFilter.FILTER_ACCEPT;
        });
        var c = treeWalker.nextNode();
        return {
            node: c ? c : root,
            position: index
        };
    }

    private saveCaretPosition(elem: Node) {
        let selection = window.getSelection();
        let rng = selection.getRangeAt(0);
        rng.setStart(elem, 0);
        let len = rng.toString().length;
        return () => {
            var pos = ProblemComponent.getTextNodeAtPosition(elem, len);
            selection.removeAllRanges();
            var range = new Range();
            range.setStart(pos.node, pos.position);
            selection.addRange(range);
        };
    }
    
    kbEvent(event: KeyboardEvent) {
        let keyCodeMap = { 'Enter': '\u000A', 'Tab': '\u0009' };
        if (event.key in keyCodeMap) {
            event.preventDefault();
            let doc = this.editorDiv.ownerDocument.defaultView;
            let sel = doc.getSelection();
            let range = sel.getRangeAt(0);
            let tabNode = document.createTextNode(keyCodeMap[event.key]);
            range.insertNode(tabNode);
            range.setStartAfter(tabNode);
            range.setEndAfter(tabNode); 
            sel.removeAllRanges();
            sel.addRange(range);
        }
        this.highlight();
    }

    highlight() {
        let restore = this.saveCaretPosition(this.editorDiv);
        let innerHTML = hljs.highlight(this.editorDiv.innerText, { language: 'python' }).value;
        this.editorDiv.innerHTML = `<pre><code [lineNumbers]="true">${innerHTML}</code></pre>`;
        restore();
    }

    tip(aux: string): string {
        return this.user ? '' : 'You need to Login to ' + aux;
    }
}
