import { Component, ViewChild } from '@angular/core';
import { AuthService } from './services/auth.service';
import { MatDrawer, MatButton } from '@angular/material';
import { MediaChange, ObservableMedia } from "@angular/flex-layout";
import { Router } from '@angular/router';
import { MenuService } from './services/menu.service';
import { menu } from './services/menu.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Puppy Dossier';
  mode: string = 'side';
  opened: boolean = true;
  showmenu: string = "block";
  @ViewChild('leftmenu') leftmenu: any;
  @ViewChild('sidenav') sidenav: MatDrawer;

  actions = [
    {
      name: 'Nieuwe puppy',
      icon: 'home',
      link: '/home',
      action: 'NEW_PUPPY',
      updated: new Date('2/20/16'),
    }
  ];

  constructor(
    public authService: AuthService,
    private router: Router,
    public menuService: MenuService) {
  }

  showInfo(link: any) {
    console.log(link);
  }

  clickMenuItem() {
    // if (this.sidenav.mode == "over" || this.sidenav.mode == "push") {
    //   this.sidenav.close();
    // }
  }

  clickListItem(menuitem: menu): void {
    if (menuitem.link != null)
    {
       this.router.navigateByUrl(menuitem.link).then(() => {
       });
    }
    else if (menuitem.action != null)
    {
      this.menuService.doExecuteMenu(menuitem);
    }
  }

  sidenavToggle() {
    //this.sidenav.opened = !this.sidenav.opened;
    var el = this.leftmenu.nativeElement.style.display;

    this.leftmenu.nativeElement.style.display = (el === "none" ? "block" : "none");
  }

}
