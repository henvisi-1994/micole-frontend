import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMassiveNewComponent } from './user-massive-new.component';

describe('UserMassiveNewComponent', () => {
  let component: UserMassiveNewComponent;
  let fixture: ComponentFixture<UserMassiveNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMassiveNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMassiveNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
