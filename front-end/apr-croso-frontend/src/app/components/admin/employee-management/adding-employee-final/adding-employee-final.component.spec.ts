import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddingEmployeeFinalComponent } from './adding-employee-final.component';

describe('AddingEmployeeFinalComponent', () => {
  let component: AddingEmployeeFinalComponent;
  let fixture: ComponentFixture<AddingEmployeeFinalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddingEmployeeFinalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddingEmployeeFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
