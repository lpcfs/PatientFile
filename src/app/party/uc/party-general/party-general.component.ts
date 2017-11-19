import { Component, OnInit, Input, Output, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { PatientId, Patient } from '../../patient/patient';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import * as moment from 'moment';

@Component({
  selector: 'app-party-general',
  templateUrl: './party-general.component.html',
  styleUrls: ['./party-general.component.css'],
  host: {'(window:keydown)': 'hotkeys($event)'},
})
export class PartyGeneralComponent implements OnInit {
  private _id: string = '';

  @Input()
  set id(id: string) { this._id = id; }
  get id(): string { return this._id; }

  @Output() patientName: string
  @Output() age: number
  @Output() loading: boolean

  hotkeys(event){
    if (event.keyCode == 83 && event.ctrlKey){
      this.save();
      return false;
    }
 }

  constructor(private route: ActivatedRoute,
              private router: Router,
              @Inject(FormBuilder) private fb: FormBuilder,
              public dialog: MatDialog,
              private afs: AngularFirestore) {

    this.createForm();

  }

  public patientForm: FormGroup;

  private patientDoc: AngularFirestoreDocument<PatientId>;
  private patient: Observable<PatientId>;
  public patientOrginal: Patient;
  
  ngOnInit() {
      this.loading = true

       // --- patient general
       this.patientDoc = this.afs.doc<PatientId>(`patient/${this.id}/general/1`);
       this.patient = this.patientDoc.valueChanges();
   
       this.patient.subscribe((v: Patient) => {
         this.loading = false
         
         if (!v) return;
         this.patientOrginal = v;
   
         // calculate the output
         this.patientName = `${v.firstname} ${v.lastname} - ${v.street}`;
         this.age = moment.duration(moment(new Date()).diff(v.birthdate)).years();

         //this.patientForm.patchValue(v);
         this.patientForm.reset(this.patientOrginal);
       });
  }

  createForm() {
    this.patientForm = this.fb.group(
      {
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        street: ['', Validators.required],
        zip: ['', Validators.required],
        city: ['', Validators.required],
        active: false,
        birthdate: ['', Validators.required]
      });


    this.patientForm.enable();
  }

  save() {
    if (this.patientForm.status != "VALID") return;
    this.patientDoc.set(this.patientForm.value).then(() => {

    })
  }

  cancel() {
    this.patientForm.reset(this.patientOrginal);
  }

}


