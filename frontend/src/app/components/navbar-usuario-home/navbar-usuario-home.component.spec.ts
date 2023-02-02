import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarUsuarioHomeComponent } from './navbar-usuario-home.component';

describe('NavbarUsuarioHomeComponent', () => {
  let component: NavbarUsuarioHomeComponent;
  let fixture: ComponentFixture<NavbarUsuarioHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarUsuarioHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarUsuarioHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
