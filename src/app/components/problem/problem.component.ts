import { Component, ViewChild } from '@angular/core';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FeedbackService } from 'src/app/services/feedback.service';
import { ProblemService } from 'src/app/services/problem.service';
import { SandboxService } from 'src/app/services/sandbox.service';
import { SubmissionsService } from 'src/app/services/submissions.service';
import { Problem } from 'src/app/helpers/problem';
import { Submission } from 'src/app/helpers/submission';
import hljs from 'highlight.js/lib/core';
import python from 'highlight.js/lib/languages/python';
import { User } from 'src/app/helpers/user';
import { Testcase } from 'src/app/helpers/testcase';
import { Feedback } from 'src/app/helpers/feedback';
import { SubmissionsInfo } from 'src/app/helpers/submissions-info';
import { ChallengesService } from 'src/app/services/challenges.service';
import { MatDialog } from '@angular/material/dialog';
import { NewChallengeDialogComponent } from '../new-challenge-dialog/new-challenge-dialog.component';

@Component({
  selector: 'problem',
  templateUrl: './problem.component.html',
  styleUrl: './problem.component.sass'
})
export class ProblemComponent {
    problem: Problem;
    feedback: Feedback;
    submissionsInfo: SubmissionsInfo;
    challenges: any[];
    challengeIdx: number = -2;
    user_id: string;
    colors: string[] = ['deepskyblue', 'darkorange', 'crimson'];
    difficulties: string[] = ['Easy', 'Medium', 'Hard'];
    states: string[] = ['Solved', 'Attempted', ''];
    stateIcons: string[] = ['panorama_fish_eye', 'change_history'];
    testcaseIdx: number = 0;
    outputs: string[] = [];
    outputIdx: number = 0;
    status: string = '';
    stColumns: string[] = ['status', 'runtime', 'memory'];
    editorElem: HTMLElement | any;
    challengesMenuElem: HTMLElement | any;
    @ViewChild('tct') testcasesTabGroup: MatTabGroup;
    @ViewChild('pt') problemTabGroup: MatTabGroup;

    constructor(private authService: AuthenticationService, private router: Router,
        private route: ActivatedRoute, private problemService: ProblemService,
        private feedbackService: FeedbackService, private sandboxService: SandboxService,
        private submissionsService: SubmissionsService, private challengesService: ChallengesService,
        private dialog: MatDialog) { }

    ngOnInit() {
        this.editorElem = document.getElementById('code');
        hljs.registerLanguage('python', python);
        this.challengesMenuElem = document.getElementById('mc');

        let title = this.route.snapshot.paramMap.get('title');
        let user_id = this.authService.user?.id;
        this.user_id = user_id ? user_id : '-1';
        this.problemService.getProblemByTitle(title)
            .subscribe(problem => {
                this.problem = problem;
                this.insertCode(problem.code);
                this.updateFeedback();
                this.updateSubmissions();
            });
    }

    get difficulty(): string {
        return this.difficulties[this.problem.difficulty];
    }

    get difficultyStyle(): string {
        return 'color:' + this.colors[this.problem.difficulty];
    }

    get state(): string {
        return this.states[this.submissionsInfo.problemState];
    }

    get stateStyle(): string {
        return 'color:' + this.colors[this.submissionsInfo.problemState];
    }

    get stateIcon(): string {
        return this.stateIcons[this.submissionsInfo.problemState];
    }

    get ar(): string {
        let value = 0;
        if (this.submissionsInfo.totalSubmissions != 0)
            value = 100 * this.submissionsInfo.totalAccepted / this.submissionsInfo.totalSubmissions;
        return value.toFixed(1) + '%';
    }

    get user(): User | null {
        return this.authService.user;
    }

    updateFeedback() {
        this.feedbackService.getFeedback(this.problem.title, this.user_id)
            .subscribe(feedback => { this.feedback = feedback; });
    }

    updateSubmissions() {
        this.submissionsService.getSubmissionsInfo(this.problem.title, this.user_id)
            .subscribe(submissionsInfo => { this.submissionsInfo = submissionsInfo; });
    }

    get positiveFeedbackColor() {
        return this.feedback.user > 0 ? 'primary' : '';
    }

    get negativeFeedbackColor() {
        return this.feedback.user < 0 ? 'primary' : '';
    }

    leaveFeedback(feedback: number) {
        if (this.user) {
            this.feedbackService.leaveFeedback(this.problem.title, this.user_id, Math.sign(feedback));
            this.updateFeedback();
        }
    }

    modifyTestcase(key: string, value: string) {
        this.testcase.input[key] = value;
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

    setOutputIdx(i: number) {
        this.outputIdx = i;
    }

    get result(): Testcase {
        return this.problem.testcases[this.outputIdx];
    }

    get output(): string {
        return this.outputs[this.outputIdx];
    }

    rCaseColor(i: number): string {
        return i == this.outputIdx ? 'primary' : '';
    }

    statusColor(status: string): string {
        const idx = status === 'Accepted' ? 0 : 2;
        return `color: ${this.colors[idx]}`;
    }

    runtime(submission: Submission): string {
        return submission.runtime < 0 ? 'N/A' : submission.runtime + ' ms';
    }

    memory(submission: Submission): string {
        return submission.memory < 0 ? 'N/A' : submission.memory + ' MB';
    }

    caseDotStyle(i: number): string {
        const idx = String(this.outputs[i]) == String(this.problem.testcases[i].output) ? 0 : 2;
        return `margin-bottom: -8px; font-size: 8px; color: ${this.colors[idx]}`;
    }

    retrieveCode() {
        if (this.submissionsInfo.submissions.length > 0)
            this.insertCode(this.submissionsInfo.submissions[0].code);
    }

    run() {
        if (this.user) {
            this.sandboxService.run(this.problem.title, this.editorElem.innerText, JSON.stringify(this.problem.testcases))
                .subscribe(response => {
                    this.outputs = response['outputs'];
                    this.status = response['status'];
                    for (let i = 0; i < response['expected'].length; i++)
                        this.problem.testcases[i].output = response['expected'][i];
                    this.testcasesTabGroup.selectedIndex = 1;
                });
        }
    }

    submit() {
        if (this.user) {
            this.sandboxService.submit(this.problem.title, this.user_id, this.editorElem.innerText)
                .subscribe(_ => {
                    this.updateSubmissions();
                    this.problemTabGroup.selectedIndex = 2;
                });
        }
    }

    setChallengeIdx(i: number) {
        this.challengeIdx = i;
    }

    get challenge() {
        return this.challenges[this.challengeIdx];
    }

    addProblemToChallenge() {
        this.challengesService.addProblem(this.user.username, this.challenge.name, this.problem.title)
            .subscribe(_ => this.updateChallenges());
    }

    deleteProblemFromChallenge() {
        this.challengesService.deleteProblem(this.user.username, this.challenge.name, this.problem.title)
            .subscribe(_ => this.updateChallenges());    
    }

    updateChallenges() {
        this.challengesService.getProblemChallenges(this.user.username, this.problem.title)
            .subscribe(response => {
                this.challenges = response['challenges'];
                this.challengeIdx = 0;
            });
    }

    openNewChallengeDialog() {
        const dialogRef = this.dialog.open(NewChallengeDialogComponent);
        dialogRef.componentInstance.username = this.user.username;
        dialogRef.afterClosed().subscribe(_ => this.updateChallenges());
    }

    insertCode(code: string) {
        this.editorElem.innerText = code;
        this.highlightResetCaret();
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
            let doc = this.editorElem.ownerDocument.defaultView;
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

    private highlightResetCaret() {
        this.editorElem.innerHTML = hljs.highlight(this.editorElem.innerText, { language: 'python' }).value;
    }

    highlight() {
        let restore = this.saveCaretPosition(this.editorElem);
        this.highlightResetCaret();
        restore();
    }

    tip(aux: string): string {
        return this.user ? '' : 'You need to Login to ' + aux;
    }
}
