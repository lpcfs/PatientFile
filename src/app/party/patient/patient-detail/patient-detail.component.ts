import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { PatientId, Patient, communication } from '../patient';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.css']
})
export class PatientDetailComponent implements OnInit {
  patientName: string;
  communicationForm: FormGroup;
  id: string;

  communicationDoc: AngularFirestoreDocument<communication>;
  communication: Observable<communication>;
  communicationOriginal: communication;

  constructor(private route: ActivatedRoute,
    private router: Router,
    @Inject(FormBuilder) private fb: FormBuilder,
    public dialog: MatDialog,
    private afs: AngularFirestore) {

    this.createForm();

  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    // --- patient communication
    this.communicationDoc = this.afs.doc<communication>(`patient/${this.id}/communication/1`);
    this.communication = this.communicationDoc.valueChanges();

    this.communication.subscribe((v: communication) => {
      if (!v) return;
      this.communicationOriginal = v;

      //this.patientForm.patchValue(v);
      this.communicationForm.reset(this.communicationOriginal);
    });
  }

  createForm() {

    this.communicationForm = this.fb.group(
      {
        email: ['', Validators.required],
        phone: ['', Validators.required],
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
}


      // let dialogRef = this.dialog.open(PatientDetailComponent, {
      //   data: this.patientForm.value
      // });

      // dialogRef.afterClosed().subscribe(result => {
      //   console.log('The dialog was closed');
      // });
