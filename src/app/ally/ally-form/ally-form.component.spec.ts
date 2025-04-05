import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllyFormComponent } from './ally-form.component';

describe('AllyFormComponent', () => {
  let component: AllyFormComponent;
  let fixture: ComponentFixture<AllyFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllyFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
