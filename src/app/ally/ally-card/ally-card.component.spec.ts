import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllyCardComponent } from './ally-card.component';

describe('AllyCardComponent', () => {
  let component: AllyCardComponent;
  let fixture: ComponentFixture<AllyCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllyCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllyCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
