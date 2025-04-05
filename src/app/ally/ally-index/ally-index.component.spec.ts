import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllyIndexComponent } from './ally-index.component';

describe('AllyIndexComponent', () => {
  let component: AllyIndexComponent;
  let fixture: ComponentFixture<AllyIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllyIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllyIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
