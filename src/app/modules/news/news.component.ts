import { Component, OnInit, TypeProvider } from '@angular/core';
import { Trending } from 'src/app/interfaces/trending';
import { ReadService } from 'src/app/services/read/read.service';
import { TrendingCardComponent } from '../shared/components/card-slider/cards/trending-card/trending-card.component';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  public trendingPosts: Trending[] = [];
  public readonly cardType: TypeProvider = TrendingCardComponent;

  constructor(
    private _read: ReadService,
  ) { }

  ngOnInit(): void {
    this._read.getTrending().subscribe((posts: Trending[]) => {
      this.trendingPosts = posts;
    });
  }
}
