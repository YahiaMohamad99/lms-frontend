import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DialogConfirmComponent } from './dialog-confirm/dialog-confirm.component';
import { MatDialogModule } from '@angular/material/dialog';


const materialModules = [
  MatCardModule,
  MatGridListModule,
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatTableModule,
  MatInputModule,
  MatFormFieldModule,
     MatDialogModule,
  
];

@NgModule({
  exports: materialModules,
  imports: materialModules,
  declarations: [
    DialogConfirmComponent
  ],
})
export class MaterialModule {}
