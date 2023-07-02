import { AfterViewInit, Component, ComponentRef, Input, OnInit, TypeProvider, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from 'src/app/modules/shared/components/card-slider/cards/card.component';
import { BankTransaction } from 'src/app/interfaces/bank-transaction';
import { Trending } from 'src/app/interfaces/trending';

@Component({
  selector: 'app-card-holder',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-container #cardContainer></ng-container>
  `,
  styles: [
  ]
})
export class CardHolderComponent implements OnInit, AfterViewInit {

  @ViewChild('cardContainer', { read: ViewContainerRef }) cardContainer: ViewContainerRef;

  @Input() public data: BankTransaction | Trending;

  @Input() public cardType: TypeProvider;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
      this.createComponent()
  }

  private createComponent() {
    const componentRef: ComponentRef<CardComponent> = this.cardContainer.createComponent(this.cardType);
    componentRef.instance.data = this.data;
  }
}
