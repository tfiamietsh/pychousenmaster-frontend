import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profile } from 'src/app/helpers/profile';
import { LoadingService } from 'src/app/services/loading.service';
import { ProfileService } from 'src/app/services/profile.service';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.sass'
})
export class ProfileComponent {
    profile: Profile;

    constructor(private route: ActivatedRoute, private profileService: ProfileService,
        private titleService: TitleService, private loadingService: LoadingService) { }

    ngOnInit() {
        const username = this.route.snapshot.paramMap.get('username');
        this.profileService.getProfile(username)
            .subscribe(response => this.profile = response['profile']);
        this.titleService.setTitle(username, 'Profile');
    }

    ngAfterViewInit() {
        this.loadingService.setState(false);
    }

    ngOnDestroy() {
        this.loadingService.setState(true);
    }

    barStyle(num: number, denom: number) {
        return `width: ${(100 * num / denom).toFixed(0)}%`;
    }

    tooltip(num: number, denom: number) {
        return `Solved ${(100 * num / denom).toFixed(1)}%`;
    }

    makeLink(title: string) {
        return `/problems/${title.toLowerCase().replace(' ', '-')}`;
    }
}
