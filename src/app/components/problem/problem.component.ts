import { Component } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Submission } from 'src/app/helpers/submission';
import { Testcase } from 'src/app/helpers/testcase';
import hljs from 'highlight.js/lib/core';
import python from 'highlight.js/lib/languages/python';

@Component({
  selector: 'problem',
  templateUrl: './problem.component.html',
  styleUrl: './problem.component.sass'
})
export class ProblemComponent {
    title: string;
    colors: string[] = ['deepskyblue', 'darkorange', 'crimson'];
    difficulties: string[] = ['Easy', 'Medium', 'Hard'];
    difficultyIdx: number;
    states: string[] = ['Solved', 'Attempted', ''];
    stateIcons: string[] = ['panorama_fish_eye', 'change_history'];
    stateIdx: number;
    liked: number;
    disliked: number;
    description: string;
    totalAccepted: number;
    totalSubmissions: number;
    tags: string[];
    testcases: Testcase[];
    testcaseIdx: number;
    results: string[];
    resultIdx: number;
    status: string;
    stColumns: string[] = ['status', 'runtime', 'memory'];
    submissions: Submission[];
    editorDiv: HTMLDivElement | any;

    constructor(private authService: AuthenticationService, private router: Router) { }

    ngOnInit() {
        this.editorDiv = document.getElementsByClassName('editor-div')[0];
        hljs.registerLanguage('python', python);
    }

    get difficulty() {
        return this.difficulties[this.difficultyIdx];
    }

    get difficultyStyle() {
        return 'color:' + this.colors[this.difficultyIdx];
    }

    get state() {
        return this.states[this.stateIdx];
    }

    get stateStyle() {
        return 'color:' + this.colors[this.stateIdx];
    }

    get stateIcon() {
        return this.stateIcons[this.stateIdx];
    }

    get ar() {
        return (100 * this.totalAccepted / this.totalSubmissions).toFixed(1) + '%';
    }

    get user() {
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

    get testcase() {
        return this.testcases[this.testcaseIdx];
    }

    tcCaseColor(i: number) {
        return i == this.testcaseIdx ? 'primary' : '';
    }

    setResultIdx(i: number) {
        this.resultIdx = i;
    }

    get result() {
        return this.testcases[this.resultIdx];
    }

    get expected() {
        return this.results[this.resultIdx];
    }

    rCaseColor(i: number) {
        return i == this.resultIdx ? 'primary' : '';
    }

    statusColor(status: string) {
        const idx = status === 'Accepted' ? 0 : 2;
        return `color: ${this.colors[idx]}`;
    }

    caseDotStyle(i: number) {
        const idx = this.testcases[i].output == this.results[i] ? 0 : 2;
        return `font-size: 8px; color: ${this.colors[idx]}`;
    }

    resetCode() {
        //  TODO
    }

    retrieveCode() {
        //  TODO
    }

    run() {
        //  TODO
    }

    submit() {
        //  TODO
    }

    openDialog() {
        //  TODO
    }

    select(submission: Submission) {
        this.editorDiv.innerText = submission.code;
        this.highlight();
    }

    private static getTextNodeAtPosition(root: Node, index: number){
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
}
