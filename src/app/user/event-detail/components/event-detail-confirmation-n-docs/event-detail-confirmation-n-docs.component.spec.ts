import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventDetailConfirmationNDocsComponent } from './event-detail-confirmation-n-docs.component';

describe('EventDetailConfirmationNDocsComponent', () => {
  let component: EventDetailConfirmationNDocsComponent;
  let fixture: ComponentFixture<EventDetailConfirmationNDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventDetailConfirmationNDocsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EventDetailConfirmationNDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
