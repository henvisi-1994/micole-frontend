import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { concat, Observable } from 'rxjs';
import { Task } from 'src/models/task/task.model';
import { TaskService } from 'src/services/task/task.service';

@Component({
  selector: 'app-task-editable',
  templateUrl: './task-editable.component.html',
  styleUrls: ['./task-editable.component.scss']
})
export class TaskEditableComponent implements OnInit {
  taskForm: FormGroup;
  isLoading: boolean;

  constructor(private fb: FormBuilder, private taskService:TaskService) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.taskForm = this.fb.group({
      tasks: this.fb.array([this.createTaskFormGroup()])
    });
  }

  createTaskFormGroup(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      taskDate: ['', Validators.required],
      percentage: [0, [Validators.required, Validators.min(0), Validators.max(100)]]
    });
  }

  get tasks(): FormArray {
    return this.taskForm.get('tasks') as FormArray;
  }

  addTask(): void {
    this.tasks.push(this.createTaskFormGroup());
  }

  removeTask(index: number): void {
    this.tasks.removeAt(index);
  }

  saveChanges(): void {
    if (this.taskForm.valid) {
      this.isLoading = true;

      const tasksArray = this.taskForm.value.tasks;
      const updateRequests: Observable<any>[] = [];

      tasksArray.forEach((task: any) => {
        const formattedTask = {
          id: task.id || null,
          name: task.name,
          description: task.description,
          taskDate: this.formatDateForAPI(task.taskDate),
          Percentage: task.percentage
        };

        updateRequests.push(this.taskService.updateTaskEditable(formattedTask));
      });

      // Ejecutar peticiones en secuencia
      concat(...updateRequests).subscribe({
        next: (response) => {
          console.log('Tarea actualizada:', response);
        },
        error: (error) => {
          console.error('Error al actualizar tarea:', error);
          this.isLoading = false;
        },
        complete: () => {
          console.log('Todas las tareas procesadas');
          this.isLoading = false;
        }
      });
    } else {
      this.markFormGroupTouched(this.taskForm);
    }
  }

  private formatDateForAPI(date: Date): string {
    return formatDate(date, 'yyyy-MM-dd HH:mm:ss', 'en-US');
  }

  private markFormGroupTouched(formGroup: FormGroup | FormArray) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.markFormGroupTouched(control);
      }
    });
  }

}
