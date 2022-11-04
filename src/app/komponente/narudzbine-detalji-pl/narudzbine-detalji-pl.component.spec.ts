import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NarudzbineDetaljiPLComponent } from './narudzbine-detalji-pl.component';

describe('NarudzbineDetaljiPLComponent', () => {
  let component: NarudzbineDetaljiPLComponent;
  let fixture: ComponentFixture<NarudzbineDetaljiPLComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NarudzbineDetaljiPLComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NarudzbineDetaljiPLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
