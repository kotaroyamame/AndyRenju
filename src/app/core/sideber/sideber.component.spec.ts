import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideberComponent } from './sideber.component';

describe('SideberComponent', () => {
  let component: SideberComponent;
  let fixture: ComponentFixture<SideberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
