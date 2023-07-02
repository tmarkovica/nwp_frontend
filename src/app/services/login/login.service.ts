import { HttpClient, HttpHeaders, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccessTokenResponse } from 'src/app/interfaces/access-token-response';
import { Login } from 'src/app/interfaces/login';
import { Registration } from 'src/app/interfaces/registration';
import { UserDetails } from 'src/app/interfaces/user-details';
import { UserUpdateRequest } from 'src/app/interfaces/user-update-request';
import { environment } from 'src/environments/environment';
import { TokenManagerService } from '../token-manager/token-manager.service';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private authorization_code: string = "";
  private client_id = environment.client_id;
  private redirectURL = environment.redirectURL;
  private authorizationURL = environment.authorizationURL;
  private secret = environment.secret;
  private retrieveAccessTokenURL = `https://www.reddit.com/api/v1/access_token`;

  private loggedIn: boolean = false;

  public userDetails: UserDetails;

  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _tokenManager: TokenManagerService
  ) {
    this.readAuthorizationCodeFromQueryParams();
    this.userLoggedInCheck();
  }

  userLoggedInCheck() {
    this.loggedIn = this._tokenManager.isAuthorizationSavedInStorage();
    if (this.loggedIn) {
      this.userDetails = this._tokenManager.getUserDetails();
    }
  }

  private readAuthorizationCodeFromQueryParams() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.authorization_code = params['code'];
      if (this.authorization_code != undefined)
        this.retrieveAccessTokenFromReddit();
    });
  }

  public redirectToRedditForAuthorization() {
    window.open(this.authorizationURL);
  }

  private retrieveAccessTokenFromReddit() {
    const grantType = 'authorization_code';
    const postdata = `grant_type=${grantType}&code=${this.authorization_code}&redirect_uri=${this.redirectURL}`;

    const options = {
      headers: new HttpHeaders({
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": 'Basic ' + btoa(`${this.client_id}:${this.secret}`),
      })
    };

    this.http.post(this.retrieveAccessTokenURL, postdata, options)
    .subscribe((res: AccessTokenResponse) => {
      this._tokenManager.saveRedditAccessTokenResponseToLocalStorage(res);
      this.loggedIn = true;
      this.navigateToNewsPage();
    },
    err => {
      console.log(err);
    }
    );
  }

  public login(login: Login) {
    const encodedString = btoa(`${login.email}:${login.password}`);
    const authorization: string = `Basic ${encodedString}`

    const options = {
      headers: new HttpHeaders({
        "Authorization": authorization
      })
    };

    this.http.get('http://localhost:8080/user', options).subscribe((res: UserDetails) => {
      this.userDetails = res;
      this.loggedIn = true;
      this._tokenManager.saveUserDetailsToLocalStorage(res);
      this._tokenManager.saveBasicAuthToLocalStorage(btoa(`${login.email}:${login.password}`));
      this.navigateToNewsPage();
    }, (error) => {
      this.loggedIn = false;
    });
  }

  public registerUser(registration) {
    const reg: Registration = {
      username: registration['username'],
      password: registration['password'],
      firstName: 'name: ' + registration['username'],
      lastName: 'last name',
      address: registration['email'],
      phone: "string"
    }

    this.http.post('http://localhost:8080/user', reg).subscribe(
      (res: any) => {
        if (res == null) {
          console.log(res);
          this._tokenManager.saveBasicAuthToLocalStorage(btoa(`${registration.email}:${registration.password}`));
          this.login({ email: reg['username'], password: reg['password'] });
        }
      },
      (error) => {
        console.log(error.error);
      }
    );
  }

  private navigateToNewsPage() {
    this.router.navigate(['news']);
  }

  public isLoggedIn(): boolean {
    return this.loggedIn;
  }

  public logout() {
    this.loggedIn = false;
    this._tokenManager.removeLoginData();
    this.router.navigate(['/'], {replaceUrl: true});
  }

  public updateUserDetails(userUpdateRequest: UserUpdateRequest) {
    const options = {
      headers: new HttpHeaders({
        "Authorization": `Basic ${this._tokenManager.getBasicAuth()}`
      })
    };
    this.http.put('http://localhost:8080/user', userUpdateRequest, options).subscribe((res: HttpStatusCode.NoContent) => {
      this.userDetails.firstName = userUpdateRequest.firstName;
      this.userDetails.lastName = userUpdateRequest.lastName;
      this.userDetails.address = userUpdateRequest.address;
      this.userDetails.phone = userUpdateRequest.phone;
      this._tokenManager.saveUserDetailsToLocalStorage(this.userDetails);
    });
  }
}
