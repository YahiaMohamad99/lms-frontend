import { Component } from '@angular/core';

@Component({
  selector: 'app-dialog-confirm',
  template: `
    <h2 mat-dialog-title> Delete Confirmation ⚠️  </h2>
    <mat-dialog-content>Are You Sure You want to confirm Deleting </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close="false">Cancel ❌ </button>
    <button mat-button color="warn" [mat-dialog-close]="true">🗑️ حذف</button>

    </mat-dialog-actions>
  `
})
export class DialogConfirmComponent {}
