import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventUpdateRepresentativeManagementComponent } from './event-update-representative-management.component';

describe('EventUpdateRepresentativeManagementComponent', () => {
  let component: EventUpdateRepresentativeManagementComponent;
  let fixture: ComponentFixture<EventUpdateRepresentativeManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventUpdateRepresentativeManagementComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      EventUpdateRepresentativeManagementComponent,
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
