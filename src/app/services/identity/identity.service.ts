import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenManagerService } from '../token-manager/token-manager.service';

@Injectable({
  providedIn: 'root'
})
export class IdentityService {

  constructor(
    private http: HttpClient,
    private _tokenManager: TokenManagerService
    ) {
  }

  public getUserIdentity() {
    const options = {
      headers: new HttpHeaders({
        "Authorization": this._tokenManager.getRedditAuthorization_bearerToken(),
        "Content-Type": "application/x-www-form-urlencoded",
      })
    };

   return this.http.get("https://oauth.reddit.com/api/v1/me", options);
  }
}
