import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProblemDialogComponent } from './new-problem-dialog.component';

describe('NewProblemDialogComponent', () => {
  let component: NewProblemDialogComponent;
  let fixture: ComponentFixture<NewProblemDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewProblemDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewProblemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
