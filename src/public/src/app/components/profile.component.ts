import { Component, OnInit } from '@angular/core';
import { Profile, Repo, ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  private profile : Profile = new Profile;
  private repos : Array<Repo> = [];
  private reposVisible = false;

  constructor(private profileService : ProfileService) { }

  ngOnInit() {
    this.profileService.getProfile()
      .subscribe(profile => this.profile = profile);
  }

  showRepos() {
    this.profileService.getRepos()
      .subscribe((repos) => {
        this.repos = repos;
        this.reposVisible = true;
      });
  }

}
