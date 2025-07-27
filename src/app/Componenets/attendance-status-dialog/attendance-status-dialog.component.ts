import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-attendance-status-dialog',
  templateUrl: './attendance-status-dialog.component.html',
  styleUrls: ['./attendance-status-dialog.component.css']
})
export class AttendanceStatusDialogComponent {

  constructor( public dialogRef: MatDialogRef<AttendanceStatusDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { studentName: string, sessionTitle: string, currentStatus: boolean }){}


     onChangeStatus(newStatus: boolean) {
    this.dialogRef.close(newStatus);
  }

  onCancel() {
    this.dialogRef.close(null);
  }
}
