import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkClassModalComponent } from './link-class-modal.component';

describe('LinkClassModalComponent', () => {
  let component: LinkClassModalComponent;
  let fixture: ComponentFixture<LinkClassModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkClassModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkClassModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
