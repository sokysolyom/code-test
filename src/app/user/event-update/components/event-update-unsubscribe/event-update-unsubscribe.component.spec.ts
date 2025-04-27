import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventUpdateUnsubscribeComponent } from './event-update-unsubscribe.component';

describe('EventUpdateUnsubscribeComponent', () => {
  let component: EventUpdateUnsubscribeComponent;
  let fixture: ComponentFixture<EventUpdateUnsubscribeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventUpdateUnsubscribeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EventUpdateUnsubscribeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
