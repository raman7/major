import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowQuestionsFacultyComponent } from './show-questions-faculty.component';

describe('ShowQuestionsFacultyComponent', () => {
  let component: ShowQuestionsFacultyComponent;
  let fixture: ComponentFixture<ShowQuestionsFacultyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowQuestionsFacultyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowQuestionsFacultyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
