import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkfieldRequestListComponent } from './workfield-request-list.component';

describe('WorkfieldRequestListComponent', () => {
  let component: WorkfieldRequestListComponent;
  let fixture: ComponentFixture<WorkfieldRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkfieldRequestListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkfieldRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
