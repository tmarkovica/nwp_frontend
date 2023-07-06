import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenManagerService } from '../token-manager/token-manager.service';
import { environment } from 'src/environments/environment';
import { Account } from 'src/app/interfaces/account';

@Injectable({
  providedIn: 'root'
})
export class IdentityService {

  constructor(
    private http: HttpClient,
    private _tokenManager: TokenManagerService
    ) {
  }

  getAccountIdForRedditLogin(redditId: string, username: string) {
    const body = {
      id: redditId,
      username: username
    }

    this.http.post(`${environment.api_url}/Account/RedditAccount`, body).subscribe((res: Account[]) => {
      this._tokenManager.saveAccountToLocalStorage({
        id: res[0].id,
        username: res[0].username,
        email: ''
      });
    });
  }

  public getUserIdentity(): Promise<any> {
    const options = {
      headers: new HttpHeaders({
        "Authorization": this._tokenManager.getRedditAuthorization_bearerToken(),
        "Content-Type": "application/x-www-form-urlencoded",
      })
    };

    return this.http.get("https://oauth.reddit.com/api/v1/me", options).toPromise().then((res: any) => {
      this.getAccountIdForRedditLogin(res["id"], res["name"]);
      return res;
    });
  }
}
