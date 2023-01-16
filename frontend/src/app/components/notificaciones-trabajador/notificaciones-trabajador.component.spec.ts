import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacionesTrabajadorComponent } from './notificaciones-trabajador.component';

describe('NotificacionesTrabajadorComponent', () => {
  let component: NotificacionesTrabajadorComponent;
  let fixture: ComponentFixture<NotificacionesTrabajadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificacionesTrabajadorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificacionesTrabajadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
