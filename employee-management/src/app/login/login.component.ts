import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../Model/user';
import { EmployeeService } from '../Service/employee.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  error!: string
  mailValidation = true;
  validationBoolean = true;
  passwordValidation = true;
  mailRegex = new RegExp('[a-zA-Z0-9][a-zA-Z0-9]+@[a-zA-Z0-9]+([\.][a-zA-Z]+)+');
  passwordRegex = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*');
  mailMin = 15;
  mailMax = 30;
  pwdMin = 8;
  pwdMax = 20;
  login = '';
  mail = '';
  pwd = '';

  constructor(private service: EmployeeService, private route: Router) { }

  ngOnInit(): void {
  }

  loginUser() {
    const loginObj = {
      email_id: this.mail,
      password: this.pwd
    } 
    if(this.validation(loginObj)) {
      this.service.login(loginObj).subscribe((res: any) => {
          localStorage.setItem('token', res.token);
          this.login = 'success';
          setTimeout(() => {
            this.route.navigate(['home']);
          }, 2000);
      }, (err: any) => {
        this.error = err.error;
        this.login = 'failed';
      });
    }
  }

  validation(loginObj: Login) {
    
    if(loginObj.email_id != undefined) {
      const foundmail = loginObj.email_id.match(this.mailRegex);
      if( foundmail != null && foundmail[0].length === loginObj.email_id.length && foundmail[0].length >= this.mailMin && foundmail[0].length <= this.mailMax) {
        this.mailValidation = true;
        this.validationBoolean = this.validationBoolean && true;
      } else {
        this.mailValidation = false;
        this.validationBoolean = this.validationBoolean && false;
      } 
    } else {
      this.mailValidation = false;
      this.validationBoolean = this.validationBoolean && false;
    }
    
    if(loginObj.password != undefined) {
      const foundPassword = loginObj.password.match(this.passwordRegex);
      if( foundPassword != null && foundPassword[0].length === loginObj.password.length && foundPassword[0].length >= this.pwdMin && foundPassword[0].length <= this.pwdMax) {
          this.passwordValidation = true;
          this.validationBoolean = this.validationBoolean && true;
      } else {
        this.passwordValidation = false;
        this.validationBoolean = this.validationBoolean && false;
      } 
    } else {
      this.passwordValidation = false;
      this.validationBoolean = this.validationBoolean && false;
    }
  return this.validationBoolean;
  }

}
