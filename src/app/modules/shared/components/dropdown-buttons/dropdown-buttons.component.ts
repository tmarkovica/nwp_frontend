import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-dropdown-buttons',
  templateUrl: './dropdown-buttons.component.html',
  styleUrls: ['./dropdown-buttons.component.scss']
})
export class DropdownButtonsComponent implements OnInit {

  @Input() public username: string;

  public dropdownHidden: boolean = true;

  constructor(
    private _login: LoginService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  public goToPage(page: string) {
    this.router.navigate([page]);
  }

  public logout() {
    this._login.logout();
  }
}
