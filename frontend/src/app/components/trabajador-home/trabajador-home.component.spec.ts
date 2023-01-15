import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabajadorHomeComponent } from './trabajador-home.component';

describe('TrabajadorHomeComponent', () => {
  let component: TrabajadorHomeComponent;
  let fixture: ComponentFixture<TrabajadorHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrabajadorHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrabajadorHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
