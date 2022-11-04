import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProizvodiDetaljiComponent } from './proizvodi-detalji.component';

describe('ProizvodiDetaljiComponent', () => {
  let component: ProizvodiDetaljiComponent;
  let fixture: ComponentFixture<ProizvodiDetaljiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProizvodiDetaljiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProizvodiDetaljiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
