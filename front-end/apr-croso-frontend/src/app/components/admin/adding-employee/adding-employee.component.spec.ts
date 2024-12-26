import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddingEmployeeComponent } from './adding-employee.component';

describe('AddingEmployeeComponent', () => {
  let component: AddingEmployeeComponent;
  let fixture: ComponentFixture<AddingEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddingEmployeeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddingEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
