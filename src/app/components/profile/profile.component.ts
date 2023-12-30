import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profile } from 'src/app/helpers/profile';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.sass'
})
export class ProfileComponent {
    profile: Profile;

    constructor(private route: ActivatedRoute, private profileService: ProfileService) { }

    ngOnInit() {
        this.profileService.getProfile(this.route.snapshot.paramMap.get('username'))
            .subscribe(response => this.profile = response['profile']);
    }

    barStyle(num: number, denom: number) {
        return `width: ${(100 * num / denom).toFixed(0)}%`;
    }

    tooltip(num: number, denom: number) {
        return `Solved ${(100 * num / denom).toFixed(1)}%`;
    }
}
