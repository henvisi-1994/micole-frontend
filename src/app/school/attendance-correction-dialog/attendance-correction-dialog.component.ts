import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-attendance-correction-dialog',
  templateUrl: './attendance-correction-dialog.component.html',
})
export class AttendanceCorrectionDialogComponent {
  correctionForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AttendanceCorrectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.correctionForm = this.fb.group({
      attendedClasses: [data.student.attendedClasses, [Validators.required, Validators.min(0)]],
      missedClasses: [data.student.missedClasses, [Validators.required, Validators.min(0)]],
      correctionReason: ['', Validators.required]
    });
  }

  onSave() {
    if (this.correctionForm.valid) {
      this.dialogRef.close({
        ...this.correctionForm.value,
        studentId: this.data.student.studentId
      });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
