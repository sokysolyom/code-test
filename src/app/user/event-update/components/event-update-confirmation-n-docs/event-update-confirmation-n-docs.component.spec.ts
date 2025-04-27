import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventUpdateConfirmationNDocsComponent } from './event-update-confirmation-n-docs.component';

describe('EventUpdateConfirmationNDocsComponent', () => {
  let component: EventUpdateConfirmationNDocsComponent;
  let fixture: ComponentFixture<EventUpdateConfirmationNDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventUpdateConfirmationNDocsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EventUpdateConfirmationNDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
