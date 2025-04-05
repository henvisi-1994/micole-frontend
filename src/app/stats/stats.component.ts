import { StatsService } from "./../../services/stats/stats.service";
import {
  CourseSchool,
  FranchiseSchool,
  SchoolById,
  SchoolYearSchool,
} from "./../../models/school/schoolById.model";
import { stats } from "./../../models/parametric/stats.model";
import { DataService } from "./../../services/data.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Notification } from "src/util/notifications";
import { ChartDataSets, ChartOptions, ChartType } from "chart.js";
import { Label } from "ng2-charts";

@Component({
  selector: "app-stats",
  templateUrl: "./stats.component.html",
  styleUrls: ["./stats.component.sass"],
})
export class StatsComponent implements OnInit {
  schoolId: string;
  showChart: boolean;
  isPie: boolean;
  isAdmin: boolean;
  schools: SchoolById[];
  franchises: FranchiseSchool[];
  schoolYears: SchoolYearSchool[];
  courses: CourseSchool[];
  stats = stats;
  selectedStats: string;
  selectedFranchise: string;
  selectedSchoolYear: string;
  selectedCourse: string;
  selectedSchool: SchoolById;
  isCoursesStats: boolean;
  barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: "end",
        align: "end",
      },
    },
  };
  barChartLabels: Label[] = [];
  barChartType: ChartType = "bar";
  pieChartType: ChartType = "pie";
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [];
  chartColors = [
    {
      backgroundColor: ["#2b3a42", "#b3b3b3", "#004888", "#666666"],
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private statsService: StatsService
  ) {
    this.showChart = false;
    this.isPie = false;
    this.dataService.breadcrumbs.next(["Estadisticas"]);
    this.isCoursesStats = false;
    this.selectedStats = this.getStats()[0];
    this.schools = this.route.snapshot.data["response"];
    if (this.route.snapshot.params.id) {
      this.schoolId = this.route.snapshot.params.id;
      this.isAdmin = false;
      this.selectedSchool = this.schools.filter(
        (x) => x.id === this.schoolId
      )[0];
    } else {
      this.isAdmin = true;
      this.schoolId = this.schools[0].id;
      this.selectedSchool = this.schools[0];
    }
  }

  getStats() {
    return Object.keys(this.stats);
  }

  schoolChanged(value) {
    this.selectedSchool = this.schools.filter((x) => x.id === value)[0];
    this.franchises = this.selectedSchool.franchises;
    this.selectedFranchise = this.franchises[0].id;
    this.schoolYears = this.franchises[0].schoolYears;
    this.selectedSchoolYear = this.schoolYears[0].id;
    this.courses = this.schoolYears[0].courses;
    this.selectedCourse = this.courses[0].id;
  }

  statsChanged(value) {
    if (value === "COURSES") {
      this.isCoursesStats = true;
      this.franchises = this.selectedSchool.franchises;
      this.selectedFranchise = this.franchises[0].id;
      this.schoolYears = this.franchises[0].schoolYears;
      this.selectedSchoolYear = this.schoolYears[0].id;
      this.courses = this.schoolYears[0].courses;
      this.selectedCourse = this.courses[0].id;
    } else {
      this.isCoursesStats = false;
    }
  }

  franchiseChanged(value) {
    this.schoolYears = this.franchises.filter(
      (x) => x.id === value
    )[0].schoolYears;
    this.selectedSchoolYear = this.schoolYears[0].id;
    this.courses = this.schoolYears[0].courses;
    this.selectedCourse = this.courses[0].id;
  }

  schoolYearChanged(value) {
    this.courses = this.schoolYears.filter((x) => x.id === value)[0].courses;
    this.selectedCourse = this.courses[0].id;
  }

  geneareStats() {
    this.showChart = true;
    let path = "";
    let id = "";
    let label = "";
    if (this.selectedStats === "USERS") {
      path = "Schools";
      id = this.schoolId;
      label = "Tipos de usuario";
      this.isPie = false;
    } else {
      path = "Courses";
      id = this.selectedCourse;
      label = "Genero";
      this.isPie = true;
    }
    this.barChartLabels = [];
    this.barChartData = [];
    this.statsService.stats(id, path).subscribe(
      (data) => {
        this.barChartLabels = data.map((x) => x.name);
        this.barChartData = [{ data: data.map((x) => x.value), label }];
      },
      (err) => {
        Notification.show("<b>Error</b>", err);
      }
    );
  }

  ngOnInit(): void {}
}
