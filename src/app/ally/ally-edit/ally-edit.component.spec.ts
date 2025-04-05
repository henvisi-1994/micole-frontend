import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllyEditComponent } from './ally-edit.component';

describe('AllyEditComponent', () => {
  let component: AllyEditComponent;
  let fixture: ComponentFixture<AllyEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllyEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllyEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
