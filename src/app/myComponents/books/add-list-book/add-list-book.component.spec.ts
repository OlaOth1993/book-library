import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddListBookComponent } from './add-list-book.component';

describe('AddListBookComponent', () => {
  let component: AddListBookComponent;
  let fixture: ComponentFixture<AddListBookComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddListBookComponent]
    });
    fixture = TestBed.createComponent(AddListBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
