import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroDetallePage } from './registro-detalle.page';

describe('RegistroDetallePage', () => {
  let component: RegistroDetallePage;
  let fixture: ComponentFixture<RegistroDetallePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroDetallePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
