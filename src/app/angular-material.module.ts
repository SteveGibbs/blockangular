import {NgModule} from '@angular/core';
import {
  MatTableModule,
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatDialogModule
} from '@angular/material';

@NgModule({
  /**
   * the imports section is not strictly needed as angular will import the modules automatically
   * if you just have them listed in the export section
   * this module is just to organise the file structure so that app.module does not become unwieldy
   */
  imports: [
    MatTableModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatDialogModule,
  ],
  exports: [
    MatTableModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatDialogModule,
  ],
})

export class AngularMaterialModule {}

