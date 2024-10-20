import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantdashComponent } from './restaurantdash.component';

describe('RestaurantdashComponent', () => {
  let component: RestaurantdashComponent;
  let fixture: ComponentFixture<RestaurantdashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantdashComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
