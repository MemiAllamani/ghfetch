import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/** Models */

export class Profile {
  name: string;
  company: string;
  location: string;
  followers: Number;
  following: Number;
}

export class Repo {
  name: string;
  description: string;
  private: boolean;
  forks_count: Number;
  stargazers_count: Number;
}

/** Service */

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  getProfile() : Observable<Profile> {
    return this.http.get<Profile>('/me');
  }

  getRepos() : Observable<Array<Repo>> {
    return this.http.get<Array<Repo>>('/me/repos');
  }
}
