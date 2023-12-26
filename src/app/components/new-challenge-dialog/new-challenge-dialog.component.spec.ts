import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewChallengeDialogComponent } from './new-challenge-dialog.component';

describe('NewChallengeDialogComponent', () => {
  let component: NewChallengeDialogComponent;
  let fixture: ComponentFixture<NewChallengeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewChallengeDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewChallengeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
