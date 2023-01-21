import { Component } from '@angular/core';
import { EmployeeService } from '../../services/employee.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-employee-login',
  templateUrl: './employee-login.component.html',
  styleUrls: ['./employee-login.component.scss']
})
export class EmployeeLoginComponent {
  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  celular: string;

  loginTrabajador() {
    this.employeeService.getTrabajador(this.celular).subscribe(
      res => {
        if (res == null) {
          console.log('Trabajador no encontrado')
        }
        else {
          console.log('Trabajador hallado')
          this.employeeService.setTrabajadorActual(this.celular)
          this.router.navigate(['trabajador-home'])
        }
      },
      err => console.log(err)
    )
  }
}
