import { Component, ViewChild } from '@angular/core';
import { AuthService } from './services/auth.service';
import { MatDrawer, MatButton } from '@angular/material';
import { MediaChange, ObservableMedia } from "@angular/flex-layout";

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
      name: 'Nieuwe Patient',
      icon: 'home',
      link: '/home',
      updated: new Date('2/20/16'),
    },
    {
      name: 'Nieuwe Planning',
      icon: 'folder',
      link: '/patienten/overzicht',
      updated: new Date('1/18/16'),
    }
    ,
    {
      name: 'Nieuwe Briefing',
      icon: 'star',
      link: '/home',
      updated: new Date('1/18/16'),
    }
  ];

  shortcuts = [
    {
      name: 'Patienten',
      icon: 'home',
      link: 'home2',
      updated: new Date('2/20/16'),
    },
    {
      name: 'Plannings',
      icon: 'folder',
      link: 'patienten/overzicht',
      updated: new Date('1/18/16'),
    }
    ,
    {
      name: 'Graph',
      icon: 'star',
      link: 'chart',
      updated: new Date('1/18/16'),
    }
  ];


  constructor(public authService: AuthService) {
  }

  showInfo(link: any) {
    console.log(link);
  }

  chechHide() {
    if (this.sidenav.mode == "over" || this.sidenav.mode == "push") {
      this.sidenav.close();
    }
  }

  sidenavToggle() {
    //this.sidenav.opened = !this.sidenav.opened;
    var el = this.leftmenu.nativeElement.style.display;

    this.leftmenu.nativeElement.style.display = (el === "none" ? "block" : "none");
  }

}
