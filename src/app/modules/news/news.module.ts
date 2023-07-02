import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { NewsComponent } from './news.component';
import { NewsRoutingModule } from './news-routing.module';

@NgModule({
  declarations: [NewsComponent],
  imports: [
    CommonModule,
    SharedModule,
    NewsRoutingModule
  ],
  exports: []
})
export class NewsModule { }
