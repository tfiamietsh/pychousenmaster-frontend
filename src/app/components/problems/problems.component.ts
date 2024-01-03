import { Component, ViewChild } from '@angular/core';
import { ProblemItem } from '../../helpers/problem-item';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TagsService } from 'src/app/services/tags.service';
import { ProblemsService } from 'src/app/services/problems.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { NewProblemDialogComponent } from '../new-problem-dialog/new-problem-dialog.component';
import { Roles } from 'src/app/helpers/user';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'problems',
  templateUrl: './problems.component.html',
  styleUrl: './problems.component.sass'
})
export class ProblemsComponent {
    tagIdxMap: any;
    mask: number = 0;
    userId: string;
    items: ProblemItem[] = [];
    columns: string[] = ['status', 'title', 'acceptance', 'difficulty'];
    dataSource = new MatTableDataSource<ProblemItem>(this.items);
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private authService: AuthenticationService, private tagsService: TagsService,
        private problemsService: ProblemsService, private dialog: MatDialog,
        private loadingService: LoadingService) { }

    ngOnInit() {
        let userId = this.authService.user?.id;
        this.userId = userId ? userId : '-1';
        this.tagsService.getTags().subscribe(response => {
            this.tagIdxMap = response['tagIdxMap'];
            this.updateProblemItems();
        });
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.loadingService.setState(false);
    }

    ngOnDestroy() {
        this.loadingService.setState(true);
    }

    get admin() {
        return this.authService.user ? this.authService.user.role == Roles.Admin : false;
    }

    get keys() {
        return Object.keys(this.tagIdxMap);
    }

    updateProblemItems() {
        this.problemsService.getProblems(this.mask, this.userId)
            .subscribe(response => { this.items = response['problems']; });
    }

    processTag(tag: string) {
        if (this.mask & this.tagIdxMap[tag])
            this.mask ^= this.tagIdxMap[tag];
        else
            this.mask |= this.tagIdxMap[tag];
        this.updateProblemItems();
    }

    icon(status: string) {
        return {
            'Solved': 'panorama_fish_eye',
            'Attempted': 'change_history',
            '': ''
        }[status];
    }

    iconStyle(status: string) {
        return 'margin-top: 4px;' + {
            'Solved': 'color: deepskyblue',
            'Attempted': 'color: darkorange',
            '': ''
        }[status];
    }

    acceptance(acceptance: number) {
        return acceptance.toFixed(1) + '%';
    }

    difficultyStyle(difficulty: string) {
        return 'color:' + {
            'Easy': 'deepskyblue',
            'Medium': 'darkorange',
            'Hard': 'crimson'
        }[difficulty];
    }

    makeLink(title: string) {
        return `/problems/${title.toLowerCase().replace(' ', '-')}`;
    }

    openDialog() {
        this.dialog.open(NewProblemDialogComponent).afterClosed().subscribe(_ => this.updateProblemItems());
    }
}
