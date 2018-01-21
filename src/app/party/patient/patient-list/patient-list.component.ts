import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { MatSliderChange } from '@angular/material';
import { Patient, PatientId } from '../patient';
import { AngularFireDatabase } from 'angularfire2/database';
import { ActivatedRoute, Router } from '@angular/router';
import { SHORTCUTMENU, ACTIONMENU } from './actionmenu';
import { MenuService } from '../../../services/menu.service';
import { Subscription } from 'rxjs/Subscription';
import { menu } from '../../../services/menu.model';


@Component({
  selector: 'party-patient-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public db: AngularFirestore,
    private menuService: MenuService) {
      this._subscription = this.menuService.action.subscribe( (event: menu) => {
        //if (event.action == "NEW_PUPPY") return this.add();
        
        console.log(event);
      });
  }

  private _subscription: Subscription;
  
    ngOnDestroy () {
      //this._subscription.unsubscribe();
      this._subscription.unsubscribe();
    }
    
  items: Observable<any[]>;
  cardStyle: any = {'width': '300px'};

  showSpinner: boolean = false;

  // https://github.com/angular/angularfire2/blob/master/docs/firestore/collections.md

  ngOnInit() {
    
    var itemCollection = this.db.collection<Patient>('patient');
    // .snapshotChanges() returns a DocumentChangeAction[], which contains
    // a lot of information about "what happened" with each change. If you want to
    // get the data and the id use the map operator.
    this.items = itemCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Patient;
        const id = a.payload.doc.id;
        const rtn = { id, action: a, ...data };
        
        console.log("element", rtn);

        return rtn; 
      });
    });

    // this.items.subscribe(() => this.showSpinner = false);

    this.menuService.loadActionMenu(ACTIONMENU);
    this.menuService.loadShortcutMenu(SHORTCUTMENU);
  }

  fnChangeSlider($event: MatSliderChange)
  {
     this.cardStyle = {'width': `${$event.value}px`};
  }

  count: number = 0;
  add()
  {
    this.count++;
    var itemCollection = this.db.collection<any>('patient');
    itemCollection.add({}).then((item) => {
       this.router.navigateByUrl(`/patient/${item.id}`);
    });
  }
  remove(item: PatientId)
  {
    var doc = this.db.doc<PatientId>(`patient/${item.id}`);
    var docValues = doc.valueChanges();
    doc.delete().then(()=>{console.log('ok')}).catch((e)=>{console.log("", e)});
  }


}
