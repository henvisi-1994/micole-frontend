import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestVerificationEmailComponent } from './request-verification-email.component';

describe('RequestVerificationEmailComponent', () => {
  let component: RequestVerificationEmailComponent;
  let fixture: ComponentFixture<RequestVerificationEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestVerificationEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestVerificationEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
