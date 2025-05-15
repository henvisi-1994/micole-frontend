import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../../models/parametric/pagination.model';
import { Action } from '../../../models/parametric/action.model';
import { SubjectBySchoolYear } from 'src/models/subject/subjectBySchoolYear.model';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/services/data.service';
import { SchoolService } from 'src/services/school/school.service';
@Component({
  selector: "app-exclusion-subject",
  templateUrl: "./exclusion-subject.component.html",
  styleUrls: ["./exclusion-subject.component.scss"],
})
export class ExclusionSubjectComponent implements OnInit {
  headers = ["Materia", "Descripción", "Curso", "Porcentaje", "Excluir"];
  keys = ["name", "description", "course", "percentage", "excluida"];
  actions: Action[] = [
    {
      type: "info",
      action: "incluir",
      icon: "fa fa-eye",
      tooltip: "Incluir materia",
    },
    {
      type: "info",
      action: "excluir",
      icon: "fa fa-eye-slash",
      tooltip: "Excluir materia",
    },
  ];

  groups: {
    id: string;
    franchise: string;
    schoolYear: string;
    expanded: boolean;
    subjects: any[]; // Cambiado de items a subjects
    pagination: Pagination;
  }[] = [];

  materiasExcluidas: any[] = [];
  rawData: SubjectBySchoolYear[];

  constructor(
    private route: ActivatedRoute,
    private schoolService: SchoolService,
    private dataService: DataService
  ) {
    this.dataService.breadcrumbs.next(["Mis materias"]);
  }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.rawData = this.route.snapshot.data["response"];

    this.groups = this.rawData.map((group, index) => ({
      id: group.id,
      franchise: group.franchise,
      schoolYear: `${group.startYear} - ${group.endYear}`,
      expanded: index === 0,
      subjects: group.subjects.map((subject) => ({
        ...subject,
        excluida: false,
      })),
      pagination: {
        currentPage: 1,
        totalPages: Math.ceil(group.subjects.length / 10),
        totalItems: group.subjects.length,
        itemPerPage: 10,
      },
    }));

    this.actualizarMateriasExcluidas();
  }

  toggleGroup(group: any): void {
    // Cerrar todos los demás grupos al abrir uno nuevo
    if (!group.expanded) {
      this.groups.forEach((g) => (g.expanded = false));
      group.expanded = true;
    }
  }

  onAction(event: any, groupIndex: number): void {
    this.groups[groupIndex].subjects[event.index].excluida =
      event.action === "incluir" ? false : true;
    this.actualizarMateriasExcluidas();
    console.log("excluit", this.materiasExcluidas);
  }

  onRequest(event: any, groupIndex: number): void {
    console.log("excluir");

    this.groups[groupIndex].subjects[event.index].excluida = true;
    this.actualizarMateriasExcluidas();
  }

  toggleExclusion(subject: any, groupIndex: number, itemIndex: number): void {
    this.groups[groupIndex].subjects[itemIndex].excluida = !subject.excluida;
    this.actualizarMateriasExcluidas();
  }

  actualizarMateriasExcluidas(): void {
    this.materiasExcluidas = this.groups.map((group) =>
      group.subjects.filter((subject) => subject.excluida)
    );
  }

  incluirMateria(materia: any): void {
    for (const group of this.groups) {
      const index = group.subjects.findIndex(
        (subject) => subject.id === materia.id
      );
      if (index !== -1) {
        group.subjects[index].excluida = false;
        break;
      }
    }
    this.actualizarMateriasExcluidas();
  }

  guardarConfiguracion(): void {
    const excludedIds = this.materiasExcluidas.reduce(
      (acumulador: string[], grupoActual) => {
        const idsGrupo = grupoActual
          .filter((materia) => materia?.excluida)
          .map((materia) => materia.id);
        return acumulador.concat(idsGrupo);
      },
      []
    );
    // Mostrar loading
    this.dataService.loadingScreen.next(true);

    // Llamar al servicio
    this.schoolService.updateExcludedSubjects(excludedIds).subscribe({
      next: (response) => {
        this.dataService.loadingScreen.next(false);
        console.log("Materias excluidas actualizadas:", response);
      },
      error: (error) => {
        this.dataService.loadingScreen.next(false);
        console.error("Error al guardar materias excluidas:", error);
      },
    });
  }
}
