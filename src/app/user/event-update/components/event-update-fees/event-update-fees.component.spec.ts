import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventUpdateFeesComponent } from './event-update-fees.component';

describe('EventUpdateFeesComponent', () => {
  let component: EventUpdateFeesComponent;
  let fixture: ComponentFixture<EventUpdateFeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventUpdateFeesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EventUpdateFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
