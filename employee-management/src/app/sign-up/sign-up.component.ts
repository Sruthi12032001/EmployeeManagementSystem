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
  error!: string
  validaionBoolean = true;
  nameRegex = new RegExp('[A-Za-z\\s]+');
  pinCodeRegex = new RegExp('[0-9]+');
  mailRegex = new RegExp('[a-zA-Z0-9][a-zA-Z0-9]+@[a-zA-Z0-9]+([\.][a-zA-Z]+)+');
  passwordRegex = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*');
  addressRegex = new RegExp('[0-9A-Za-z,\\s\.:]+');
  mailMin = 10;
  mailMax = 30;
  firstNameMin =  3;
  firstNameMax = 20;
  lastNameMin =  3;
  lastNameMax = 20;
  employeeTypeMin = 10;
  employeeTypeMax = 30;
  passwordMin = 8;
  passwordMax = 16;
  pinMin = 5;
  pinMax = 6;
  addressMin = 10;
  addressMax = 100;
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
      this.service.create(user).subscribe((res: any) => {
          this.signedIn = 'signed';
          localStorage.setItem('token', res.token);
          setTimeout(() => {
            this.router.navigate(['home']);
          }, 2000);
      }, (err: any) => {
        this.error = err.error;
        this.signedIn = 'failed';
      });
    }
   
  }

  validation(user: User) {

    if(user.first_name != undefined) {
      const foundFirstName = user.first_name.match(this.nameRegex);
      if( foundFirstName != null && foundFirstName[0].length === user.first_name.length && foundFirstName[0].length >= this.firstNameMin && foundFirstName[0].length <= this.firstNameMax) {
          this.firstNameValidation = true;
          this.validaionBoolean = true;
      } else {
        this.firstNameValidation = false;
        this.validaionBoolean = false;
      } 
    } else {
      this.firstNameValidation = false;
      this.validaionBoolean = false;
    }
    
    if(user.last_name != undefined) {
      const foundLastName = user.last_name.match(this.nameRegex);
      if( foundLastName != null && foundLastName[0].length === user.last_name.length && foundLastName[0].length >= this.lastNameMin && foundLastName[0].length <= this.lastNameMax) {
        this.lastNameValidation = true;
        this.validaionBoolean = this.validaionBoolean && true;
      } else {
        this.lastNameValidation = false;
        this.validaionBoolean = this.validaionBoolean &&  false;
      } 
    } else{
        this.lastNameValidation = false;
        this.validaionBoolean = this.validaionBoolean &&  false;
    } 
    
    if(user.age === undefined &&!(user.age > this.minAge && user.age < this.maxAge)) {
      this.ageValidation = false;
      this.validaionBoolean = this.validaionBoolean && false;
    } else {
      this.ageValidation = true;
      this.validaionBoolean = this.validaionBoolean && true;
    }
    
    if(user.employee_type != undefined) {
      const foundEmployeeType = user.employee_type.match(this.nameRegex);
      if( foundEmployeeType != null && foundEmployeeType[0].length === user.employee_type.length && foundEmployeeType[0].length >= this.employeeTypeMin && foundEmployeeType[0].length <= this.employeeTypeMax) {
          this.employeeTypeValidation = true;
          this.validaionBoolean = this.validaionBoolean && true;
      } else {
        this.employeeTypeValidation = false;
        this.validaionBoolean = this.validaionBoolean && false;
      }   
    } else {
      this.employeeTypeValidation = false;
      this.validaionBoolean = this.validaionBoolean && false;
    }
   
    if(user.pin_code != undefined) {
      const foundPin= user.pin_code.match(this.pinCodeRegex);
      if( foundPin != null && foundPin[0].length === user.pin_code.length && foundPin[0].length >= this.pinMin && foundPin[0].length <= this.pinMax) {
          this.pinCodeValidation = true;
          this.validaionBoolean = this.validaionBoolean && true;
      } else {
        this.pinCodeValidation = false;
        this.validaionBoolean = this.validaionBoolean && false;
      } 
    } else {
      this.pinCodeValidation = false;
      this.validaionBoolean = this.validaionBoolean && false;
    }
    
    if(user.address != undefined) {
      const foundAddress= user.address.match(this.addressRegex);
      if( foundAddress != null && foundAddress[0].length === user.address.length && foundAddress[0].length >= this.addressMin && foundAddress[0].length <= this.addressMax) {
          this.addressValidation = true;
          this.validaionBoolean = this.validaionBoolean && true;
      } else {
        this.addressValidation = false;
        this.validaionBoolean = this.validaionBoolean && false;
      } 
    } else {
      this.addressValidation = false;
      this.validaionBoolean = this.validaionBoolean && false;
    }
    
      if(user.email_id != undefined) {
        const foundmail = user.email_id.match(this.mailRegex);
        if( foundmail != null && foundmail[0].length === user.email_id.length && foundmail[0].length >= this.mailMin && foundmail[0].length <= this.mailMax) {
          this.mailValidation = true;
          this.validaionBoolean = this.validaionBoolean && true;
        } else {
          this.mailValidation = false;
          this.validaionBoolean = this.validaionBoolean && false;
        } 
      } else {
        this.mailValidation = false;
        this.validaionBoolean = this.validaionBoolean && false;
      }
      
      if(user.password != undefined) {
        const foundPassword = user.password.match(this.passwordRegex);
        if( foundPassword != null && foundPassword[0].length === user.password.length && foundPassword[0].length >= this.passwordMin && foundPassword[0].length <= this.passwordMax) {
            this.passwordValidation = true;
            this.validaionBoolean = this.validaionBoolean && true;
        } else {
          this.passwordValidation = false;
          this.validaionBoolean = this.validaionBoolean && false;
        } 
      } else {
        this.passwordValidation = false;
        this.validaionBoolean = this.validaionBoolean && false;
      }

    return this.validaionBoolean;
  }

}
