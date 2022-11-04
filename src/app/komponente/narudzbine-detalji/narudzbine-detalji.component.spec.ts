import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NarudzbineDetaljiComponent } from './narudzbine-detalji.component';

describe('NarudzbineDetaljiComponent', () => {
  let component: NarudzbineDetaljiComponent;
  let fixture: ComponentFixture<NarudzbineDetaljiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NarudzbineDetaljiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NarudzbineDetaljiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
