import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTransactionComponent } from './modal-transaction.component';

describe('ModalTransactionComponent', () => {
  let component: ModalTransactionComponent;
  let fixture: ComponentFixture<ModalTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalTransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
