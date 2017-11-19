import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoolChartComponent } from './cool-chart.component';

describe('CoolChartComponent', () => {
  let component: CoolChartComponent;
  let fixture: ComponentFixture<CoolChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoolChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoolChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
