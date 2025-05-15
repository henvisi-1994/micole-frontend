import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-evidence-attachment-dialog',
  templateUrl: './evidence-attachment-dialog.component.html',
})
export class EvidenceAttachmentDialogComponent {
  evidenceForm: FormGroup;
  selectedFile: File | null = null;

  constructor(
    public dialogRef: MatDialogRef<EvidenceAttachmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.evidenceForm = this.fb.group({
      evidenceType: ['', Validators.required],
      comments: ['']
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSave() {
    if (this.evidenceForm.valid && this.selectedFile) {
      this.dialogRef.close({
        ...this.evidenceForm.value,
        file: this.selectedFile,
        studentId: this.data.student.studentId
      });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
