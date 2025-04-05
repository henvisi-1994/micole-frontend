import { Component, OnInit, ElementRef, Input } from "@angular/core";
import { DataService } from "src/services/data.service";
import { Router, NavigationEnd, NavigationStart } from "@angular/router";
import { Subscription } from "rxjs";
import { filter } from "rxjs/operators";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.sass"],
})
export class NavbarComponent implements OnInit {
  isAuth: boolean;
  private toggleButton: any;
  private sidebarVisible: boolean;
  mobile_menu_visible: any = 0;
  private _router: Subscription;
  @Input() isLight: boolean = false;
  @Input() isFluid: boolean = true;
  @Input() hasName: boolean = false;
  @Input() public: boolean = false;
  @Input() name: string = "";
  breadcrumbs: String[] = [];

  constructor(
    private dataService: DataService,
    private element: ElementRef,
    private router: Router
  ) {
    this.sidebarVisible = false;
    this.dataService.breadcrumbs.subscribe((value) => {
      this.breadcrumbs = value;
    });
  }

  ngOnInit(): void {
    this.isAuth = this.dataService.isAuthenticated();
    const navbar: HTMLElement = this.element.nativeElement;

    this.toggleButton = navbar.getElementsByClassName("navbar-toggler")[0];
    this._router = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.sidebarClose();
        const $layer = document.getElementsByClassName("close-layer")[0];
        if ($layer) {
          $layer.remove();
        }
      });
    const body = document.getElementsByTagName("body")[0];
    if (this.isFluid) {
      body.classList.remove("off-canvas-sidebar");
    } else {
      body.classList.add("off-canvas-sidebar");
    }
  }

  sidebarOpen() {
    let $toggle = document.getElementsByClassName("navbar-toggler")[0];
    const toggleButton = this.toggleButton;
    const body = document.getElementsByTagName("body")[0];
    setTimeout(function () {
      toggleButton.classList.add("toggled");
    }, 500);
    body.classList.add("nav-open");
    setTimeout(function () {
      $toggle.classList.add("toggled");
    }, 430);

    let $layer = document.createElement("div");
    $layer.setAttribute("class", "close-layer");
    if (
      body.querySelectorAll(".main-panel") &&
      body.querySelectorAll(".main-panel").length > 0
    ) {
      document.getElementsByClassName("main-panel")[0].appendChild($layer);
    } else if (body.classList.contains("off-canvas-sidebar")) {
      document
        .getElementsByClassName("wrapper-full-page")[0]
        .appendChild($layer);
    }

    setTimeout(function () {
      $layer.classList.add("visible");
    }, 100);

    $layer.onclick = function () {
      //asign a function
      body.classList.remove("nav-open");
      this.mobile_menu_visible = 0;
      this.sidebarVisible = false;

      $layer.classList.remove("visible");
      setTimeout(function () {
        $layer.remove();
        $toggle.classList.remove("toggled");
      }, 400);
    }.bind(this);

    body.classList.add("nav-open");
    this.mobile_menu_visible = 1;
    this.sidebarVisible = true;
  }

  sidebarClose() {
    let $toggle = document.getElementsByClassName("navbar-toggler")[0];
    const body = document.getElementsByTagName("body")[0];
    this.toggleButton.classList.remove("toggled");
    let $layer = document.createElement("div");
    $layer.setAttribute("class", "close-layer");

    this.sidebarVisible = false;
    body.classList.remove("nav-open");
    // $('html').removeClass('nav-open');
    body.classList.remove("nav-open");
    if ($layer) {
      $layer.remove();
    }

    setTimeout(function () {
      $toggle.classList.remove("toggled");
    }, 400);

    this.mobile_menu_visible = 0;
  }
  sidebarToggle() {
    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
  }
}
