import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpFormComponent } from './help-form.component';

describe('HelpFormComponent', () => {
  let component: HelpFormComponent;
  let fixture: ComponentFixture<HelpFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
