import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenjuComponent } from './renju.component';

describe('RenjuComponent', () => {
  let component: RenjuComponent;
  let fixture: ComponentFixture<RenjuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenjuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenjuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
