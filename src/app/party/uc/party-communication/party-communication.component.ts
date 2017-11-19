
import { Component, OnInit, Inject, Output } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { PatientId, Patient, communication } from '../../patient/patient';
import { Observable } from 'rxjs/Observable';
import { EmailValidator } from '@angular/forms';

import {
  DynamicFormControlModel, DynamicFormService,
  DynamicCheckboxModel,
  DynamicInputModel,
  DynamicRadioGroupModel
} from "@ng-dynamic-forms/core";

export const MY_FORM_MODEL: DynamicFormControlModel[] = [
  
      new DynamicInputModel({
  
          id: "sampleInput",
          label: "Sample Input",
          maxLength: 42,
          placeholder: "Sample input"
      }),
  
      new DynamicRadioGroupModel<string>({
  
          id: "sampleRadioGroup",
          label: "Sample Radio Group",
          options: [
              {
                  label: "Option 1",
                  value: "option-1",
              },
              {
                  label: "Option 2",
                  value: "option-2"
              },
              {
                  label: "Option 3",
                  value: "option-3"
              }
          ],
          value: "option-3"
      }),
  
      new DynamicCheckboxModel({
  
          id: "sampleCheckbox",
          label: "I do agree"
      })
  ];


@Component({
  selector: 'app-party-communication',
  templateUrl: './party-communication.component.html',
  styleUrls: ['./party-communication.component.css'],
  host: {'(window:keydown)': 'hotkeys($event)'},
})
export class PartyCommunicationComponent implements OnInit {
  @Output() summary: string

  formModel: DynamicFormControlModel[] = MY_FORM_MODEL;
  formGroup: FormGroup;
  
  id: string;

  public communicationForm: FormGroup;

  communicationDoc: AngularFirestoreDocument<communication>;
  communication: Observable<communication>;
  communicationOriginal: communication;
  
  constructor(private route: ActivatedRoute,
    private router: Router,
    @Inject(FormBuilder) private fb: FormBuilder,
    public dialog: MatDialog,
    private afs: AngularFirestore,
    private formService: DynamicFormService
  ) {

    this.formGroup = this.formService.createFormGroup(this.formModel);
    
    this.createForm();

  }

  hotkeys(event){
    if (event.keyCode == 83 && event.ctrlKey){
      this.saveCommunication();
      return false;
    }
 }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    // --- patient communication
    this.communicationDoc = this.afs.doc<communication>(`patient/${this.id}/communication/1`);
    this.communication = this.communicationDoc.valueChanges();

    this.communication.subscribe((v: communication) => {
      if (!v) return;
      this.communicationOriginal = v;

      this.summary = `${this.communicationOriginal.email}`

      //this.patientForm.patchValue(v);
      this.communicationForm.reset(this.communicationOriginal);
    });
  }

  createForm() {

    // https://coryrylan.com/blog/angular-form-builder-and-validation-management
    this.communicationForm = this.fb.group(
      {
        email: ['', Validators.required],
        phone: ['', Validators.required],
        emergency_phone:  ['', Validators.required],
      });

  }

  saveCommunication() {
    if (this.communicationForm.status != "VALID") return;
    this.communicationDoc.set(this.communicationForm.value).then(() => {

    })
  }

  cancelCommunication() {
    this.communicationForm.reset(this.communicationOriginal);
  }

};



      // let dialogRef = this.dialog.open(PatientDetailComponent, {
      //   data: this.patientForm.value
      // });

      // dialogRef.afterClosed().subscribe(result => {
      //   console.log('The dialog was closed');
      // });
