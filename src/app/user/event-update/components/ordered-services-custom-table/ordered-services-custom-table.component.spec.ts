import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderedServicesCustomTableComponent } from './ordered-services-custom-table.component';

describe('OrderedServicesCustomTableComponent', () => {
  let component: OrderedServicesCustomTableComponent;
  let fixture: ComponentFixture<OrderedServicesCustomTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderedServicesCustomTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderedServicesCustomTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
