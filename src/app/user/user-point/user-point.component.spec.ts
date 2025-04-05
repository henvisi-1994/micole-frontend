import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPointComponent } from './user-point.component';

describe('UserPointComponent', () => {
  let component: UserPointComponent;
  let fixture: ComponentFixture<UserPointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
