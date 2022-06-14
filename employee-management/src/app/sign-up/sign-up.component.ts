import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../Model/user';
import { EmployeeService } from '../Service/employee.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.sass']
})
export class SignUpComponent implements OnInit {
  validaionBoolean = true;
  firstNameRegex = new RegExp('[A-Za-z]{3,16}');
  lastNameRegex = new RegExp('[A-Za-z]{1,16}');
  pinCodeRegex = new RegExp('[0-9]{5,6}');
  mailRegex = new RegExp('[a-zA-Z0-9][a-zA-Z0-9]+@[a-zA-Z0-9]+([.][a-zA-Z]+)+');
  employeeRegex = new RegExp('[A-Za-z\\s]{3,50}');
  passwordRegex = new RegExp('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[%$@!]).{8,20}');
  addressRegex = new RegExp('[0-9A-Za-z,\\s.:]{10,100}');
  firstNameValidation = true;
  lastNameValidation = true;
  ageValidation = true;
  mailValidation = true;
  passwordValidation = true;
  employeeTypeValidation = true;
  salarayValidation = true;
  addressValidation = true;
  pinCodeValidation = true;
  minAge = 19;
  maxAge = 100;
  signedIn = '';
  l_name = '';
  f_name = '';
  pwd = '';
  inputMail = '';
  age!: number;
  empl_type = '';
  add = '';
  pin = '';

  constructor(private service: EmployeeService, private router :Router) { }

  ngOnInit(): void {
  }

  signUp() {
    const user: User = {
      first_name: this.f_name,
      last_name: this.l_name,
      age: this.age,
      email_id: this.inputMail,
      password: this.pwd,
      employee_type: this.empl_type,
      address: this.add,
      pin_code: this.pin
    }
    if(this.validation(user)) {
      this.service.signUp( user ).subscribe((res: any) => {
        if(!res.hasOwnProperty('status')) {
          this.signedIn = 'signed';
          this.service.token = true;
          setTimeout(() => {
            this.router.navigate(['home']);
          }, 2000);
        } else {
          this.service.token = false;
          this.signedIn = 'failed';
        }
      });
    }
   
  }

  validation(user: User) {
    if(user.first_name === undefined || !user.first_name.match(this.firstNameRegex)) {
      this.firstNameValidation = false;
      this.validaionBoolean = false;
    } else if(user.first_name.match(this.firstNameRegex)) {
      
      this.firstNameValidation = true;
      this.validaionBoolean = true;
    }
    if(user.last_name === undefined || !user.last_name.match(this.lastNameRegex)) {
      this.lastNameValidation = false;
      this.validaionBoolean = false;
    } else if(user.last_name.match(this.lastNameRegex)) {
      this.lastNameValidation = true;
      this.validaionBoolean = this.validaionBoolean && true;
    }
    if(!(user.age > this.minAge && user.age < this.maxAge)) {
      this.ageValidation = false;
      this.validaionBoolean = false;
    } else {
      this.ageValidation = true;
      this.validaionBoolean = this.validaionBoolean && true;
    }
    if(user.email_id === undefined || !user.email_id.match(this.mailRegex)) {
      this.mailValidation = false;
      this.validaionBoolean = false;
    } else if(user.email_id.match(this.mailRegex)) {
      this.mailValidation = true;
      this.validaionBoolean = this.validaionBoolean && true;
    }
    if(user.employee_type === undefined || !user.employee_type.match(this.employeeRegex)) {
      this.employeeTypeValidation = false;
      this.validaionBoolean = false;
    } else if(user.employee_type.match(this.employeeRegex)) {
      this.employeeTypeValidation = true;
      this.validaionBoolean = this.validaionBoolean && true;
    }
    if(user.password === undefined || !user.password.match(this.passwordRegex)) {
      this.passwordValidation = false;
      this.validaionBoolean = false;
    } else if(user.password.match(this.passwordRegex)) {
      this.passwordValidation = true;
      this.validaionBoolean = this.validaionBoolean && true;
    }
    if(user.pin_code === undefined || !user.pin_code.match(this.pinCodeRegex)) {
      this.pinCodeValidation = false;
      this.validaionBoolean = false;
    } else if(user.pin_code.match(this.pinCodeRegex)) {
      this.pinCodeValidation = true;
      this.validaionBoolean = this.validaionBoolean && true;
    }
    if(user.address === undefined || !user.address.match(this.addressRegex)) {
      this.addressValidation = false;
      this.validaionBoolean = false;
    } else if(user.address.match(this.addressRegex)) {
      this.addressValidation = true;
      this.validaionBoolean = this.validaionBoolean && true;
    }
    return this.validaionBoolean;
  }

}
