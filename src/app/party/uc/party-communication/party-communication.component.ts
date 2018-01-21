
import { Component, OnInit, Inject, Input, Output } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { PatientId, Patient, communication } from '../../patient/patient';
import { Observable } from 'rxjs/Observable';
import { EmailValidator } from '@angular/forms';
import { MY_FORM_MODEL } from './party-communication.formModel';
import { DynamicFormService, DynamicFormControlModel } from '@ng-dynamic-forms/core';
import { GeneratedFile } from '@angular/compiler';


@Component({
  selector: 'app-party-communication',
  templateUrl: './party-communication.component.html',
  styleUrls: ['./party-communication.component.css'],
  host: { '(window:keydown)': 'hotkeys($event)' },
})
export class PartyCommunicationComponent implements OnInit {
  @Output() summary: string

  formModel: DynamicFormControlModel[] = MY_FORM_MODEL;
  formGroup: FormGroup;

  id: string;
  query_path: string;

  communicationDoc: AngularFirestoreDocument<communication>;
  communication: Observable<communication>;
  communicationOriginal: communication;


  constructor(
    @Inject(FormBuilder) private fb: FormBuilder,
    @Inject(ActivatedRoute) private route: ActivatedRoute,
    @Inject(Router) private router: Router,
    @Inject(AngularFirestore) private afs: AngularFirestore,
    @Inject(DynamicFormService) private formService: DynamicFormService) {

    // https://coryrylan.com/blog/angular-form-builder-and-validation-management

  }

  ngOnInit() {
    this.formGroup = this.formService.createFormGroup(this.formModel);

    this.id = this.route.snapshot.paramMap.get('id');

    this.query_path = `patient/${this.id}/communication/1`;

    // --- patient communication
    this.communicationDoc = this.afs.doc<communication>(this.query_path);
    this.communication = this.communicationDoc.valueChanges();

    this.communication.subscribe((v: communication) => {
      if (!v) return;
      this.communicationOriginal = v;

      if (this.communicationOriginal.comm)
      {
        this.summary = `${this.communicationOriginal.comm.email}`
      }

      //this.patientForm.patchValue(v);
      this.formGroup.reset(v);
    });
  }

  hotkeys(event) {
    if (event.keyCode == 83 && event.ctrlKey) {
      this.save();
      return false;
    }
  }


  save() {
    if (this.formGroup.status != "VALID") return;
    this.communicationDoc.set(this.formGroup.value).then(() => {

    })
  }

  cancel() {
    this.formGroup.reset(this.communicationOriginal);
  }

};


class GenericFormComponent<T> implements OnInit {

  public entity_id: string;
  @Input() query_path: string;

  @Output() summary: string

  formModel: DynamicFormControlModel[] = MY_FORM_MODEL;
  formGroup: FormGroup;

  protected firestoreDocument: AngularFirestoreDocument<T>;
  protected observableOf: Observable<T>;
  protected original: T;

  constructor(
    @Inject(FormBuilder) private fb: FormBuilder,
    @Inject(ActivatedRoute) private route: ActivatedRoute,
    @Inject(Router) private router: Router,
    @Inject(AngularFirestore) private afs: AngularFirestore,
    @Inject(DynamicFormService) private formService: DynamicFormService) {
    // https://coryrylan.com/blog/angular-form-builder-and-validation-management
  }

  ngOnInit() {
    this.formGroup = this.formService.createFormGroup(this.formModel);

    this.entity_id = this.route.snapshot.paramMap.get('id');

    // --- patient communication
    this.firestoreDocument = this.afs.doc<T>(`patient/${this.entity_id}/communication/1`);
    this.observableOf = this.firestoreDocument.valueChanges();

    this.observableOf.subscribe((v: T) => {
      if (!v) return;
      this.original = v;

      //this.patientForm.patchValue(v);
      this.formGroup.reset(this.original);
    });
  }

  // focus in foucus out development
  // hotkeys(event) {
  //   if (event.keyCode == 83 && event.ctrlKey) {
  //     this.save();
  //     return false;
  //   }
  // }

  save() {
    if (this.formGroup.status != "VALID") return;
    this.firestoreDocument.set(this.formGroup.value).then(() => {

    })
  }

  cancel() {
    this.formGroup.reset(this.original);
  }

};



      // let dialogRef = this.dialog.open(PatientDetailComponent, {
      //   data: this.patientForm.value
      // });

      // dialogRef.afterClosed().subscribe(result => {
      //   console.log('The dialog was closed');
      // });
