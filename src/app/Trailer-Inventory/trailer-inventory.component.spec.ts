import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrailerInventoryComponent } from './trailer-inventory.component';

describe('TrailerInventoryComponent', () => {
  let component: TrailerInventoryComponent;
  let fixture: ComponentFixture<TrailerInventoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrailerInventoryComponent]
    });
    fixture = TestBed.createComponent(TrailerInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
