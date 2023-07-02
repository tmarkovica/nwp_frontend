import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { SelectLanguageComponent } from './components/select-language/select-language.component';
import { TrendingCardComponent } from './components/card-slider/cards/trending-card/trending-card.component';
import { CardSliderComponent } from './components/card-slider/card-slider.component';
import { DropdownButtonsComponent } from './components/dropdown-buttons/dropdown-buttons.component';
import { ClickOutsideDirective } from 'src/app/directives/click-outside/click-outside.directive';
import { ModalComponent } from './components/modal/modal.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { HeaderComponent } from './components/header/header.component';
import { ModalTransactionComponent } from './components/modal-transaction/modal-transaction.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardHolderComponent } from './components/card-slider/card-holder/card-holder.component';
import { TransactionCardComponent } from './components/card-slider/cards/transaction-card/transaction-card.component';

@NgModule({
  declarations: [
    ButtonComponent,
    SelectLanguageComponent,
    CardSliderComponent,
    TrendingCardComponent,
    DropdownButtonsComponent,
    ClickOutsideDirective,
    ModalComponent,
    HeaderComponent,
    ModalTransactionComponent,
  ],
  imports: [
    CommonModule,
    NzFormModule,
    ReactiveFormsModule,
    FormsModule,

    CardHolderComponent,
    TransactionCardComponent,
  ],
  exports: [
    ButtonComponent,
    SelectLanguageComponent,
    CardSliderComponent,
    TrendingCardComponent,
    DropdownButtonsComponent,
    ModalComponent,
    HeaderComponent,
    ModalTransactionComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
