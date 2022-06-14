import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { User } from '../Model/user';
import { EmployeeService } from '../Service/employee.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.sass']
})
export class DisplayComponent implements OnInit {
  display!: boolean;
  hasToken!: boolean;
  user!: User;

  constructor(private service: EmployeeService, private activeRoute: ActivatedRoute, @Inject(MAT_DIALOG_DATA) private data: string, private diaRef: MatDialogRef<HomeComponent> ) { }

  ngOnInit(): void {
    this.service.getWithId(this.data).subscribe((res: any) => {
        this.user = res;
        this.display = true; 
    } ,(err) => {
      this.display = false;
    });
  }

  close() {
    this.diaRef.close();
  }

}
