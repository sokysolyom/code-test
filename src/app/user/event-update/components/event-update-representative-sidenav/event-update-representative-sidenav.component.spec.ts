import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventUpdateRepresentativeSidenavComponent } from './event-update-representative-sidenav.component';

describe('EventUpdateRepresentativeSidenavComponent', () => {
  let component: EventUpdateRepresentativeSidenavComponent;
  let fixture: ComponentFixture<EventUpdateRepresentativeSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventUpdateRepresentativeSidenavComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      EventUpdateRepresentativeSidenavComponent,
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
