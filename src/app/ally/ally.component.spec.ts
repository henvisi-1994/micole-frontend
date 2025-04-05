import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllyComponent } from './ally.component';

describe('AllyComponent', () => {
  let component: AllyComponent;
  let fixture: ComponentFixture<AllyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
