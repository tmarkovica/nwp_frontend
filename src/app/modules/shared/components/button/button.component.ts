import { Component, Input, OnInit } from '@angular/core';
import { ButtonTypes } from '../../../../types/ButtonTypes';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() public buttonText: string = '';
  @Input() public buttonDisabled: boolean = false;
  @Input() public transition: boolean = true;
  @Input() public buttonType: ButtonTypes = 'primary';
  @Input() public icon: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  public getButtonType(): string {
    return `${this.buttonType}`;
  }
}
