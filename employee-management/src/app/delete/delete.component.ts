import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DisplayComponent } from '../display/display.component';
import { HomeComponent } from '../home/home.component';
import { EmployeeService } from '../Service/employee.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.sass']
})
export class DeleteComponent implements OnInit {
  hasToken!: boolean;
  deleted!: boolean;

  constructor(private employeeService: EmployeeService, private dialog: MatDialogRef<HomeComponent>, @Inject(MAT_DIALOG_DATA) private data: string, private router: Router) { }

  ngOnInit(): void {
  }
  dialogue(value: boolean) {
    if(value) {
        this.deleted = true;
        this.dialog.updateSize('200px','auto');
        this.employeeService.delete(this.data).subscribe((res) => {
          setTimeout(() => {
            this.dialog.close(true);
          }, 1000);
        }, (err) => {
          this.dialog.close(false);
        });
      } else {
        this.dialog.close(false);
      }
  } 
}
