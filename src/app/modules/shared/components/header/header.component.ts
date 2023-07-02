import { Component, Input, OnInit } from '@angular/core';
import { IdentityService } from 'src/app/services/identity/identity.service';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() public username: string;

  constructor(
    private _login: LoginService,
    private _identity: IdentityService,
  ) { }

  ngOnInit(): void {
    this.setUsername();
  }

  private setUsername() {
    if (this._login.userDetails != undefined) {
      this.username = this._login.userDetails.username;
      return;
    }

    this._identity.getUserIdentity().subscribe(res => {
      this.username = res["name"];
    });
  }

}
