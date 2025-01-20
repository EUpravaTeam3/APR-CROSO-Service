import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankruptcyReportComponent } from './bankruptcy-report.component';

describe('BankruptcyReportComponent', () => {
  let component: BankruptcyReportComponent;
  let fixture: ComponentFixture<BankruptcyReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BankruptcyReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BankruptcyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
