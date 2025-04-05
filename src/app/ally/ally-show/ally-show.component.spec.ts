import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllyShowComponent } from './ally-show.component';

describe('AllyShowComponent', () => {
  let component: AllyShowComponent;
  let fixture: ComponentFixture<AllyShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllyShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllyShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
