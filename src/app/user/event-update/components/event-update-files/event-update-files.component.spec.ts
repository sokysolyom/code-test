import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventUpdateFilesComponent } from './event-update-files.component';

describe('EventUpdateFilesComponent', () => {
  let component: EventUpdateFilesComponent;
  let fixture: ComponentFixture<EventUpdateFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventUpdateFilesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EventUpdateFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
