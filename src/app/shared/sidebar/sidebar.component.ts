import { Role } from "./../../../models/parametric/role.model";
import { ChildrenItem } from "./../../../models/shared/childrenItem.model";
import { Router } from "@angular/router";
import { AuthService } from "src/services/auth/auth.service";
import { LoginInfo } from "./../../../models/auth/loginInfo.model";
import { RouteInfo } from "./../../../models/shared/routeInfo.model";
import { Component, OnInit, Input } from "@angular/core";
import PerfectScrollbar from "perfect-scrollbar";

declare const $: any;

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.sass"],
})
export class SidebarComponent implements OnInit {
  @Input() currentUser: LoginInfo;
  menuItems: RouteInfo[];
  ps: any;

  constructor(private authService: AuthService, private router: Router) {}

  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }

  ngOnInit() {
    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
      const elemSidebar = <HTMLElement>(
        document.querySelector(".sidebar .sidebar-wrapper")
      );
      this.ps = new PerfectScrollbar(elemSidebar);
    }
    this.buildMenu();
  }
  updatePS(): void {
    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
      this.ps.update();
    }
  }
  isMac(): boolean {
    let bool = false;
    if (
      navigator.platform.toUpperCase().indexOf("MAC") >= 0 ||
      navigator.platform.toUpperCase().indexOf("IPAD") >= 0
    ) {
      bool = true;
    }
    return bool;
  }

  getUserImage(): String {
    if (this.currentUser.user && this.currentUser.user.photo) {
      return this.currentUser.user.photo;
    } else {
      return "../../../assets/img/default-avatar.png";
    }
  }

  getFullName() {
    const name =
      this.currentUser.user.firstName +
      " " +
      this.currentUser.user.secondName +
      " " +
      this.currentUser.user.surname +
      " " +
      this.currentUser.user.lastname;
    if (name.length < 25) return name;
    return name.slice(0, 22) + "...";
  }

  getSchoolImage(): String {
    if (this.currentUser.school && this.currentUser.school.logo) {
      return this.currentUser.school.logo;
    } else {
      return "../../../assets/img/logo.png";
    }
  }

  getSchoolName(): String {
    if (this.currentUser.school) {
      return this.currentUser.school.shortName;
    } else {
      return "Mi Cole";
    }
  }

  logout() {
    this.router.navigate(["login"]);
    this.authService.logout();
  }

  editProfile() {
    this.router.navigate([
      "dashboard",
      "users",
      this.currentUser.user.id,
      "edit",
    ]);
  }

  createRoute(parent: string[], children: string[] = null): string[] {
    if (children) {
      return [...parent, ...children];
    }
    return parent;
  }

  private buildMenu() {
    this.menuItems = [];

    if (this.currentUser.roles.includes(Role.SUPER_ADMIN)) {
      this.menuItems.push(
        {
          path: ["/", "dashboard", "schools"],
          title: "Colegios",
          type: "sub",
          icontype: "school",
          collapse: "schools",
          children: [
            { path: [], title: "Todos", ab: "TD" },
            { path: ["new"], title: "Crear", ab: "CR" },
          ],
        },
        {
          path: ["/", "dashboard", "users"],
          title: "Usuarios",
          type: "sub",
          icontype: "perm_identity",
          collapse: "users",
          children: [
            { path: [], title: "Todos", ab: "TD" },
            { path: ["new"], title: "Crear", ab: "CR" },
            { path: ["new-massive"], title: "Crear Masiva", ab: "CRM" },
            {
              path: ["new-parent-massive"],
              title: "Ascociar acudientes masivo",
              ab: "ACM",
            },
          ],
        },
        {
          path: ["/", "dashboard", "courses"],
          title: "Cursos",
          type: "link",
          icontype: "grading",
        },
        {
          path: ["/", "dashboard", "levels"],
          title: "Niveles",
          type: "link",
          icontype: "fa-star",
          fav: true,
        },
        {
          path: ["/", "dashboard", "categories"],
          title: "Categorias",
          type: "link",
          icontype: "fa-tags",
          fav: true,
        },
        {
          path: ["/", "dashboard", "stats"],
          title: "Estadisticas",
          type: "link",
          icontype: "equalizer",
        }
      );
    } else if (this.currentUser.roles.includes(Role.ADMIN)) {
      this.menuItems.push(
        {
          path: ["/", "dashboard", "schools", this.currentUser.school.id],
          title: "Colegio",
          type: "link",
          icontype: "school",
        },
        // {
        //   path: ["/", "dashboard", "schools", "config"],
        //   title: "Equivalencia notas",
        //   type: "link",
        //   icontype: "fa-gear",
        //   fav: true,
        // },
        {
          path: ["/", "dashboard", "users"],
          title: "Usuarios",
          type: "sub",
          icontype: "perm_identity",
          collapse: "users",
          children: [
            { path: [], title: "Todos", ab: "TD" },
            { path: ["new"], title: "Crear", ab: "CR" },
            { path: ["new-massive"], title: "Crear Masivo", ab: "CRM" },
            {
              path: ["new-parent-massive"],
              title: "Ascociar acudientes masivo",
              ab: "ACM",
            },
          ],
        },
        {
          path: ["/", "dashboard", "courses"],
          title: "Cursos",
          type: "link",
          icontype: "grading",
        },
        {
          path: ["/", "dashboard", "school-allies"],
          title: "Aliados",
          type: "link",
          icontype: "fa-building",
          fav: true,
        },
        {
          path: ["/", "dashboard", "school-prizes"],
          title: "Premios",
          type: "link",
          icontype: "fa-trophy",
          fav: true,
        },
        {
          path: ["/", "dashboard", "stats", this.currentUser.school.id],
          title: "Estadisticas",
          type: "link",
          icontype: "equalizer",
        }
      );
    } else if (this.currentUser.roles.includes(Role.TEACHER)) {
      this.menuItems.push(
        {
          path: ["/", "dashboard", "schools", this.currentUser.school.id],
          title: "Colegio",
          type: "link",
          icontype: "school",
        },
        {
          path: ["/", "dashboard", "admins"],
          title: "Coordinadores",
          type: "link",
          icontype: "people",
        },
        {
          path: ["/", "dashboard", "teachers"],
          title: "Profesores",
          type: "link",
          icontype: "people",
        },
        {
          path: ["/", "dashboard", "students"],
          title: "Estudiantes",
          type: "link",
          icontype: "perm_identity",
        },
        {
          path: ["/", "dashboard", "courses", "teachers"],
          title: "Direccion de curso",
          type: "link",
          icontype: "grading",
        },
        {
          path: ["/", "dashboard", "subjects", "teachers"],
          title: "Mis materias",
          type: "link",
          icontype: "subject",
        },
        {
          path: ["/", "dashboard", "timetables"],
          title: "Mi horario",
          type: "link",
          icontype: "date_range",
        },
        {
          path: ["/", "dashboard", "school-allies"],
          title: "Aliados",
          type: "link",
          icontype: "fa-building",
          fav: true,
        },
        {
          path: ["/", "dashboard", "school-prizes"],
          title: "Premios",
          type: "link",
          icontype: "fa-trophy",
          fav: true,
        },
        {
          path: ["/", "dashboard", "my-points"],
          title: "Mis puntos",
          type: "link",
          icontype: "fa-gamepad",
          fav: true,
        },
        {
          path: ["/", "dashboard", "my-redemptions"],
          title: "Mis cupones",
          type: "link",
          icontype: "fa-gift",
          fav: true,
        }
      );
    } else if (this.currentUser.roles.includes(Role.STUDENT)) {
      this.menuItems.push(
        {
          path: ["/", "dashboard", "schools", this.currentUser.school.id],
          title: "Colegio",
          type: "link",
          icontype: "school",
        },
        {
          path: ["/", "dashboard", "teachers"],
          title: "Profesores",
          type: "link",
          icontype: "people",
        },
        {
          path: ["/", "dashboard", "parents"],
          title: "Mis acudientes",
          type: "link",
          icontype: "perm_identity",
        },
        {
          path: ["/", "dashboard", "courses", "students"],
          title: "Mis cursos",
          type: "link",
          icontype: "grading",
        },
        {
          path: ["/", "dashboard", "timetables"],
          title: "Mi horario",
          type: "link",
          icontype: "date_range",
        },
        {
          path: ["/", "dashboard", "events"],
          title: "Próximos eventos",
          type: "link",
          icontype: "event",
        },
        {
          path: ["/", "dashboard", "tasks"],
          title: "Próximas tareas",
          type: "link",
          icontype: "grade",
        },
        {
          path: ["/", "dashboard", "attendances"],
          title: "Mi asistencia",
          type: "link",
          icontype: "calendar_view_day",
        },
        {
          path: ["/", "dashboard", "notifications"],
          title: "Mi observador",
          type: "link",
          icontype: "comment",
        },
        {
          path: ["/", "dashboard", "school-allies"],
          title: "Aliados",
          type: "link",
          icontype: "fa-building",
          fav: true,
        },
        {
          path: ["/", "dashboard", "school-prizes"],
          title: "Premios",
          type: "link",
          icontype: "fa-trophy",
          fav: true,
        },
        {
          path: ["/", "dashboard", "my-points"],
          title: "Mis puntos",
          type: "link",
          icontype: "fa-gamepad",
          fav: true,
        },
        {
          path: ["/", "dashboard", "my-redemptions"],
          title: "Mis cupones",
          type: "link",
          icontype: "fa-gift",
          fav: true,
        }
      );
    } else if (this.currentUser.roles.includes(Role.COUNSELOR)) {
      this.menuItems.push(
        {
          path: ["/", "dashboard", "schools", this.currentUser.school.id],
          title: "Colegio",
          type: "link",
          icontype: "school",
        },
        {
          path: ["/", "dashboard", "users"],
          title: "Usuarios",
          type: "link",
          icontype: "perm_identity",
        },
        {
          path: ["/", "dashboard", "courses"],
          title: "Cursos",
          type: "link",
          icontype: "grading",
        },
        {
          path: ["/", "dashboard", "cases"],
          title: "Mi Cole Me Cuida",
          type: "link",
          icontype: "help",
        }
      )
    } 
    else {
      this.menuItems.push(
        {
          path: ["/", "dashboard", "schools", this.currentUser.school.id],
          title: "Colegio",
          type: "link",
          icontype: "school",
        },
        {
          path: ["/", "dashboard", "teachers"],
          title: "Profesores",
          type: "link",
          icontype: "people",
        },
        {
          path: ["/", "dashboard", "children"],
          title: "Mis hijos",
          type: "link",
          icontype: "perm_identity",
        },
        {
          path: ["/", "dashboard", "school-allies"],
          title: "Aliados",
          type: "link",
          icontype: "fa-building",
          fav: true,
        },
        {
          path: ["/", "dashboard", "school-prizes"],
          title: "Premios",
          type: "link",
          icontype: "fa-trophy",
          fav: true,
        },
        {
          path: ["/", "dashboard", "my-points"],
          title: "Mis puntos",
          type: "link",
          icontype: "fa-gamepad",
          fav: true,
        },
        {
          path: ["/", "dashboard", "my-redemptions"],
          title: "Mis cupones",
          type: "link",
          icontype: "fa-gift",
          fav: true,
        }
      );
    }
  }
}
