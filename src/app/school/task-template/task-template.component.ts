import { Component, OnInit } from '@angular/core';
import { TaskInfo } from 'src/models/task/taskInfo.model';

@Component({
  selector: 'app-task-template',
  templateUrl: './task-template.component.html',
  styleUrls: ['./task-template.component.scss']
})
export class TaskTemplateComponent implements OnInit {

  tareas: TaskInfo[] = []

   constructor() {}

   ngOnInit(): void {
     // Inicializar con tareas de ejemplo
     this.tareas = [
       {
         id:'1',
         description: "Realizar ejercicios de fracciones páginas 15-20",
         subject: "Libro de texto, videos en plataforma",
         name: "Libro de texto, videos en plataforma",
         percentage: 20,
         taskDate: new Date("2024-04-15").toISOString(),
         type:""
       },
       {
         id:'2',
         description: "Investigación sobre ecosistemas colombianos",
         subject: "Biblioteca virtual, recursos compartidos",
         name: "Biblioteca virtual, recursos compartidos",
         percentage: 30,
         taskDate: new Date("2024-04-20").toISOString(),
         type: ""
       },
     ]
   }

   agregarTarea(): void {
     this.tareas.push({
       id:'1',
       description: "",
       name:"",
       subject: "",
       percentage: 0,
       taskDate: new Date().toISOString(),
       type: ""
     })
   }

   eliminarTarea(index: number): void {
     this.tareas.splice(index, 1)
   }

   guardarCambios(): void {
     // Lógica para guardar los cambios
     console.log("Tareas guardadas:", this.tareas)
     // Mostrar mensaje de éxito
   }

}
