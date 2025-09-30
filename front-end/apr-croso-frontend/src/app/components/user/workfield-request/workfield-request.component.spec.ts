import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkfieldRequestComponent } from './workfield-request.component';

describe('WorkfieldRequestComponent', () => {
  let component: WorkfieldRequestComponent;
  let fixture: ComponentFixture<WorkfieldRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkfieldRequestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkfieldRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
