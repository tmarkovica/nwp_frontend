import { Component, HostListener, Input, OnInit, TypeProvider } from '@angular/core';
import { BankTransaction } from 'src/app/interfaces/bank-transaction';
import { Trending } from 'src/app/interfaces/trending';

@Component({
  selector: 'app-card-slider',
  templateUrl: './card-slider.component.html',
  styleUrls: ['./card-slider.component.scss']
})
export class CardSliderComponent implements OnInit {

  @Input() public cardsPerPage: number = 1;
  public totalCards: number = 1;
  public currentPage: number = 1;
  public pagePosition: string = "0%";
  public totalPages: number = 1;
  public overflowWidth: string;
  public cardWidth: string;
  public containerWidth: number;
  public cardSpacing_px: number = 10;

  @Input() public cardType: TypeProvider;

  private _data: Trending[] | BankTransaction[] = null;
  @Input()
  public get data(): Trending[] | BankTransaction[] { return this._data; }
  public set data(dataArr: Trending[] | BankTransaction[]) {
    if (dataArr == undefined)
      return;

    this._data = dataArr;
    this.totalCards = this._data.length;
    this.initializeSlider();
  }

  @HostListener("window:resize") windowResize() {
    let newCardsPerPage = this.getCardsPerPage();
    if (newCardsPerPage != this.cardsPerPage) {
      this.cardsPerPage = newCardsPerPage;
      this.initializeSlider();
      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages;
        this.populatePagePosition();
      }
    }
  }

  ngOnInit() {
    if (this.cardsPerPage === 0)
      this.cardsPerPage = this.getCardsPerPage();

    this.setMarginBetweenCards();
  }

  private setMarginBetweenCards() {
    document.documentElement.style.setProperty('--card-margin', `${this.cardSpacing_px}px`);
  }

  private initializeSlider() {
    this.cardsPerPage = this.getCardsPerPage();
    this.totalPages = Math.ceil(this.totalCards / this.cardsPerPage);
    // full width of container (100%) times number of pages to calculate total width of overflow +
    // plus number of pages time spacing between two cards
    this.overflowWidth = `calc(${this.totalPages * 100}% + ${this.totalPages * this.cardSpacing_px}px)`; // 10px na oba mjesta gjde se *

    // card width with margin to push next card
    // full width of container divided by total pages (it is one page width calculated as percentage of total overflow)
    // minus number of cards per page times spacing between two cards divided by cards per page (margin to push next card)
    this.cardWidth = `calc((${100/ this.totalPages}% - ${this.cardsPerPage * this.cardSpacing_px}px) / ${this.cardsPerPage})`;
  }

  private getCardsPerPage() {
    if (window.innerWidth <= 576)
      return 1;
    else if (window.innerWidth <= 992)
      return 2;
    else
      return 3;
  }

  private populatePagePosition() {
    // -100% to swipe whole page left by how many pages (currentPage - 1 is page index); it is percentage of whole overflow
    // minus card spacing times page index
    this.pagePosition = `calc(${-100 * (this.currentPage - 1)}% - ${this.cardSpacing_px * (this.currentPage - 1)}px)`;
  }

  public changePage(incrementor) {
    this.currentPage += incrementor;
    this.populatePagePosition();
  }

  public goToPage(position: number) {
    this.currentPage = position + 1;
    this.populatePagePosition();
  }

  public paginationCircleSelected(position: number): boolean {
    return position === this.currentPage - 1
  }

  public newCardAdded() {
    this.totalCards = this._data?.length;
    this.initializeSlider();
  }
}
