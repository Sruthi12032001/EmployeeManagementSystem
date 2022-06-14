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
  mailRegex = new RegExp('([a-zA-Z0-9][a-zA-Z0-9.]+@[a-zA-Z0-9]+([.][a-zA-Z]+)+)');
  passwordRegex = new RegExp('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[%$@!]).{8,20}');
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
      this.service.login(loginObj).subscribe((res) => {
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
    console.log(loginObj.password.match(this.passwordRegex));
    if(loginObj.email_id === undefined || !loginObj.email_id.match(this.mailRegex) || (loginObj.email_id.length < this.mailMin || loginObj.email_id.length > this.mailMax))  {
      this.mailValidation = false;
      this.validationBoolean = false;
    } else if(loginObj.email_id.match(this.mailRegex) && loginObj.email_id.length >= this.mailMin && loginObj.email_id.length <= this.mailMax) {
      this.mailValidation = true;
      this.validationBoolean = this.validationBoolean && true;
    }
    if(loginObj.password === undefined || !loginObj.password.match(this.passwordRegex) ||  (loginObj.password.length < this.pwdMin || loginObj.password.length > this.pwdMax)) {
      this.passwordValidation = false;
      this.validationBoolean = false;
    } else if(loginObj.password.match(this.passwordRegex) &&  loginObj.password.length >= this.pwdMin && loginObj.password.length <= this.pwdMax) {
      this.passwordValidation = true;
      this.validationBoolean = this.validationBoolean && true;
    }
  return this.validationBoolean;
  }

}
