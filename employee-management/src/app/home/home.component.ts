import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DeleteComponent } from '../delete/delete.component';
import { DisplayComponent } from '../display/display.component';
import { EditComponent } from '../edit/edit.component';
import { User } from '../Model/user';
import { EmployeeService } from '../Service/employee.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  modifiedUsers!: User[];
  users!: User[];
  searchInput = '';
  hasToken!: boolean;

  constructor(private dialog: MatDialog, private service: EmployeeService, private router: Router) { }

  ngOnInit(): void {
    if(this.service.token) {
      this.hasToken = true;
      this.service.getAll().subscribe((res: any) => {
        if(!res.hasOwnProperty('status')) {
          this.users = <User[]>res;
          this.modifiedUsers = this.users;
        }
      }); 
    }
    
  }

  filterWithSearch() {
    this.modifiedUsers = this.users.filter((user) => {
      user.name = `${user.first_name} ${user.last_name}`;
      user.nameWithoutSpace = `${user.first_name}${user.last_name}`;
      return (user.first_name.toLowerCase().indexOf(this.searchInput.toLowerCase()) === 0 || user.email_id.toLowerCase().indexOf(this.searchInput.toLowerCase()) === 0 || user.last_name.toLowerCase().indexOf(this.searchInput.toLowerCase()) === 0 || user.name.toLowerCase().indexOf(this.searchInput.toLowerCase()) === 0 || user.nameWithoutSpace.toLowerCase().indexOf(this.searchInput.toLowerCase()) === 0 );
  });
  }

  openDialogue(id: string|undefined) {
    const matRef = this.dialog.open(DeleteComponent, {
      width: 'auto',
      data: id});
    matRef.afterClosed().subscribe((res) => {
      this.service.getAll().subscribe((res: any) => {
        if(!res.hasOwnProperty('status')) {
          this.users = <User[]>res;
          this.modifiedUsers = this.users;
        }
      }); 
    });
   
  }
  editComponent() {
    this.router.navigate(['edit']);
  }

  display(id: string|undefined) {
    console.log(id);
    this.dialog.open(DisplayComponent, {
      width: 'auto',
      data: id
    })

  }

}
