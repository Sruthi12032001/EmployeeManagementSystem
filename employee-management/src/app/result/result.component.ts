import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditComponent } from '../edit/edit.component';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.sass']
})
export class ResultComponent implements OnInit {
  value!: string;

  constructor(private dia: MatDialogRef<EditComponent>, @Inject(MAT_DIALOG_DATA) private data: string) { }

  ngOnInit(): void {
    this.value =this.data;
    setTimeout(() => {
      this.dia.close(true);
    }, 2000);
  }



}
