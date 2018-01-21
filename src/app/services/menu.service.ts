import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { menu } from './menu.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class MenuService {

  private _actionmenu: BehaviorSubject<menu[]>;
  private _shortcutmenu: BehaviorSubject<menu[]>;

  private dataStore: {  // This is where we will store our data in memory
    actionmenu: menu[],
    shortcutmenu: menu[]
  };

  public action: ReplaySubject<menu> = new ReplaySubject<menu>();

  constructor() {
    this.dataStore = { actionmenu: [], shortcutmenu: [] };
    this._actionmenu = <BehaviorSubject<menu[]>>new BehaviorSubject([]);
    this._shortcutmenu = <BehaviorSubject<menu[]>>new BehaviorSubject([]);
  }

  get actionmenu() {
    return this._actionmenu.asObservable();
  }

  get shortcutmenu() {
    return this._shortcutmenu.asObservable();
  }

  loadActionMenu(menu: menu[]) {
    this.dataStore.actionmenu = menu;
    this._actionmenu.next(Object.assign({}, this.dataStore).actionmenu);
  }

  loadShortcutMenu(menu: menu[]) {
    this.dataStore.shortcutmenu = menu;
    this._shortcutmenu.next(Object.assign({}, this.dataStore).shortcutmenu);
  }

  doExecuteMenu(menu: menu)
  {
     this.action.next(menu);
  }
}
