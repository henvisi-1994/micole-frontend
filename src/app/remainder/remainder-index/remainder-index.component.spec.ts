import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemainderIndexComponent } from './remainder-index.component';

describe('RemainderIndexComponent', () => {
  let component: RemainderIndexComponent;
  let fixture: ComponentFixture<RemainderIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemainderIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemainderIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
