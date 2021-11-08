import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisencuestasPage } from './misencuestas.page';

describe('MisencuestasPage', () => {
  let component: MisencuestasPage;
  let fixture: ComponentFixture<MisencuestasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisencuestasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisencuestasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
