import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookcardComponent } from './bookcard.component';

describe('BookcardComponent', () => {
  let component: BookcardComponent;
  let fixture: ComponentFixture<BookcardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookcardComponent]
    });
    fixture = TestBed.createComponent(BookcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
