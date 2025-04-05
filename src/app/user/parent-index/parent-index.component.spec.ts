import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentIndexComponent } from './parent-index.component';

describe('ParentIndexComponent', () => {
  let component: ParentIndexComponent;
  let fixture: ComponentFixture<ParentIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
