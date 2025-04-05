import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcheivementIndexComponent } from './acheivement-index.component';

describe('AcheivementIndexComponent', () => {
  let component: AcheivementIndexComponent;
  let fixture: ComponentFixture<AcheivementIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcheivementIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcheivementIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
