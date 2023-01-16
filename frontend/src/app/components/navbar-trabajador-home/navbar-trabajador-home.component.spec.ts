import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarTrabajadorHomeComponent } from './navbar-trabajador-home.component';

describe('NavbarTrabajadorHomeComponent', () => {
  let component: NavbarTrabajadorHomeComponent;
  let fixture: ComponentFixture<NavbarTrabajadorHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarTrabajadorHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarTrabajadorHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
