import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { LoadingService } from 'src/app/services/loading.service';
import { ProblemsService } from 'src/app/services/problems.service';
import { ChallengesService } from 'src/app/services/challenges.service';
import { UsersService } from 'src/app/services/users.service';
import { ChallengeItem } from 'src/app/helpers/challenge-item';
import { ProblemItem } from 'src/app/helpers/problem-item';
import { UserItem } from 'src/app/helpers/user-item';
import { TagsService } from 'src/app/services/tags.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.sass'
})
export class SearchComponent {
    userId: string;
    tagIdxMap: any;
    mask: number = 0;
    selectedIndex: number = 0;
    problemsDataSource = new MatTableDataSource<ProblemItem>();
    problemsColumns: string[] = ['status', 'title', 'acceptance', 'difficulty'];
    challengesDataSource = new MatTableDataSource<ChallengeItem>();
    challengesColumns: string[] = ['name', 'username'];
    usersDataSource = new MatTableDataSource<UserItem>();
    usersColumns: string[] = ['username'];
    searchInputElem: HTMLInputElement | any;
    @ViewChild('pmpg') problemsPaginator: MatPaginator;
    @ViewChild('cmpg') challengesPaginator: MatPaginator;
    @ViewChild('umpg') usersPaginator: MatPaginator;

    constructor(private loadingService: LoadingService, private authService: AuthenticationService,
        private tagsService: TagsService, private problemsService: ProblemsService,
        private challengesService: ChallengesService, private usersService: UsersService,
        private route: ActivatedRoute) { }

    ngOnInit() {
        let userId = this.authService.user?.id;
        this.userId = userId ? userId : '-1';
        this.searchInputElem = document.getElementById('smi');
        const searchValue = this.route.snapshot.queryParams['sv'];
        if (searchValue)
            this.searchInputElem.value = searchValue;
        this.tagsService.getTags().subscribe(response => {
            this.tagIdxMap = response['tagIdxMap'];
            this.search();
        });
    }

    ngAfterViewInit() {
        this.loadingService.setState(false);
    }

    ngOnDestroy() {
        this.loadingService.setState(true);
    }

    get keys() {
        return Object.keys(this.tagIdxMap);
    }

    processTag(tag: string) {
        if (this.mask & this.tagIdxMap[tag])
            this.mask ^= this.tagIdxMap[tag];
        else
            this.mask |= this.tagIdxMap[tag];
        this.updateProblems();
    }
    
    search() {
        if (this.selectedIndex == 0)
            this.updateProblems();
        else if (this.selectedIndex == 1)
            this.updateChallenges();
        else
            this.updateUsers();
    }

    tabChange(event: MatTabChangeEvent) {
        this.selectedIndex = event.index;
        this.search();
    }

    statusStyle(status: string) {
        return 'margin-top: 4px;' + {
            'Solved': 'color: deepskyblue',
            'Attempted': 'color: darkorange',
            '': ''
        }[status];
    }

    statusIcon(status: string) {
        return {
            'Solved': 'panorama_fish_eye',
            'Attempted': 'change_history',
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

    makeLinkToProblem(title: string) {
        return `/problems/${title.toLowerCase().replace(' ', '-')}`;
    }

    makeLinkToChallenge(username: string) {
        return `/challenges/${username}`;
    }

    makeLinkToProfile(username: string) {
        return `/profile/${username}`;
    }

    updateProblems() {
        this.problemsService.getProblems(this.mask, this.userId, this.searchInputElem.value)
            .subscribe(response => {
                this.problemsDataSource = new MatTableDataSource<ProblemItem>(response['problems']);
                this.problemsDataSource.paginator = this.problemsPaginator;
            });
    }

    updateChallenges() {
        this.challengesService.getChallenges(this.searchInputElem.value)
            .subscribe(response => {
                this.challengesDataSource = new MatTableDataSource<ChallengeItem>(response['challenges']);
                this.challengesDataSource.paginator = this.challengesPaginator;
            });
    }

    updateUsers() {
        this.usersService.getUsers(this.searchInputElem.value)
            .subscribe(response => {
                this.usersDataSource = new MatTableDataSource<UserItem>(response['users']);
                this.usersDataSource.paginator = this.usersPaginator;
            });
    }
}
