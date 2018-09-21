import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileCategoryComponent } from './file-category.component';

describe('FileCategoryComponent', () => {
  let component: FileCategoryComponent;
  let fixture: ComponentFixture<FileCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
