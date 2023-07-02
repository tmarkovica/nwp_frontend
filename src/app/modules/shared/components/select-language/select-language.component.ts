import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-select-language',
  templateUrl: './select-language.component.html',
  styleUrls: ['./select-language.component.scss']
})
export class SelectLanguageComponent implements OnInit {

  private language: string;

  constructor(
    private _translate: TranslateService
  ) {
  }

  ngOnInit() {
    this.language = localStorage.getItem('lang') || 'en';
    this._translate.use(this.language);
  }

  public changeLanguage(lang: string) {
    localStorage.setItem('lang', lang);
    window.location.reload();
  }

  public optionSelected(optionValue: string): boolean {
    return this.language === optionValue;
  }
}
