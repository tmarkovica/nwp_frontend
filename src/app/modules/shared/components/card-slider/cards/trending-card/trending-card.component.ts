import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardComponent } from 'src/app/modules/shared/components/card-slider/cards/card.component';
import { Trending } from 'src/app/interfaces/trending';

@Component({
  selector: 'app-trending-card',
  templateUrl: './trending-card.component.html',
  styleUrls: ['./trending-card.component.scss']
})
export class TrendingCardComponent implements OnInit, CardComponent {

  public data: Trending;

  constructor(
  ) { }

  ngOnInit(): void {
  }

  public backgroundImageWithGradient(): string {
    if (this.data == undefined)
      return ``;

    return `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.3)), url(${this.data.backgroundImage})`;
  }
}
