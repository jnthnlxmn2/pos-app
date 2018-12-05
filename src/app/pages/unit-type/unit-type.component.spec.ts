import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitTypeComponent } from './unit-type.component';

describe('UnitTypeComponent', () => {
  let component: UnitTypeComponent;
  let fixture: ComponentFixture<UnitTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
