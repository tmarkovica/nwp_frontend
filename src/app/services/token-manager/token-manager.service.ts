import { Injectable } from '@angular/core';
import { AccessTokenResponse } from 'src/app/interfaces/access-token-response';
import { UserDetails } from 'src/app/interfaces/user-details';

@Injectable({
  providedIn: 'root'
})
export class TokenManagerService {

  private ACCESS_TOKEN_STORAGE_KEY = 'access_token';
  private USER_STORAGE_KEY = 'user';
  private BASIC_AUTH_KEY = 'basic_auth';

  private accessTokenResponse: AccessTokenResponse;
  private basicAuthToken: string;
  private userDetails: UserDetails;

  private loggedInWithReddit: boolean = false;

  constructor(
  ) {
    this.loadRedditAccessTokenResponseFromLocalStorage();
    this.loadBasicAuthFromLocalStorage();
    this.loadUserDetailsFromLocalStorage();
  }

  public isLoggedInWithReddit(): boolean {
    return this.loggedInWithReddit;
  }

  // Reddit access token
  private loadRedditAccessTokenResponseFromLocalStorage() {
    this.accessTokenResponse = JSON.parse(localStorage.getItem(this.ACCESS_TOKEN_STORAGE_KEY)) as AccessTokenResponse;
  }

  public saveRedditAccessTokenResponseToLocalStorage(token: AccessTokenResponse) {
    localStorage.setItem(this.ACCESS_TOKEN_STORAGE_KEY, JSON.stringify(token));
    this.accessTokenResponse = token;
    this.loggedInWithReddit = true;
  }

  public getRedditAccessTokenResponse(): AccessTokenResponse {
    return this.accessTokenResponse;
  }

  public getRedditAuthorization_bearerToken(): string {
    return this.accessTokenResponse.token_type + " " + this.accessTokenResponse.access_token;
  }

  // Basic auth
  private loadBasicAuthFromLocalStorage() {
    this.basicAuthToken = localStorage.getItem(this.BASIC_AUTH_KEY);
    if (this.basicAuthToken != null) this.loggedInWithReddit = true;
  }

  public saveBasicAuthToLocalStorage(basicAuthToken: string) {
    localStorage.setItem(this.BASIC_AUTH_KEY, basicAuthToken);
    this.basicAuthToken = basicAuthToken;
  }

  public getBasicAuth(): string {
    return this.basicAuthToken;
  }

  // User details
  private loadUserDetailsFromLocalStorage() {
    this.userDetails = JSON.parse(localStorage.getItem(this.USER_STORAGE_KEY)) as UserDetails;
  }

  public saveUserDetailsToLocalStorage(userDetails: UserDetails) {
    localStorage.setItem(this.USER_STORAGE_KEY, JSON.stringify(userDetails));
    this.userDetails = userDetails;
  }

  public getUserDetails(): UserDetails {
    return this.userDetails;
  }

  // remove from local storage
  private removeRedditAccessTokenFromLocalStorage() {
    localStorage.removeItem(this.ACCESS_TOKEN_STORAGE_KEY);
    this.accessTokenResponse = null;
    this.loggedInWithReddit = false;
  }

  private removeUserDetailsFromLocalStorage() {
    localStorage.removeItem(this.USER_STORAGE_KEY);
    this.userDetails = null;
  }

  private removeBasicAuthFromLocalStorage() {
    localStorage.removeItem(this.BASIC_AUTH_KEY);
    this.basicAuthToken = null;
  }

  public removeLoginData() {
    this.removeRedditAccessTokenFromLocalStorage();
    this.removeUserDetailsFromLocalStorage();
    this.removeBasicAuthFromLocalStorage();
  }

  public isAuthorizationSavedInStorage(): boolean {
    if (this.basicAuthToken != null || this.accessTokenResponse != null)
      return true;
    else
      return false;
  }

  public getUserId(): number {
    return this.userDetails.id;
  }
}
