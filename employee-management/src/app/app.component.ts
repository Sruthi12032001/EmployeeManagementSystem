import { Component } from '@angular/core';
import { EmployeeService } from './Service/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'employee-management';
  constructor(private service: EmployeeService) {}
  logout() {
    this.service.token = false;
  }
}
