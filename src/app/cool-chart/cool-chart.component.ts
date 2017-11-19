
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as _ from 'lodash'
import { AngularFireDatabase } from 'angularfire2/database';
import { MatSlideToggle } from '@angular/material';



@Component({
  selector: 'app-cool-chart',
  templateUrl: './cool-chart.component.html',
  styleUrls: ['./cool-chart.component.css']
})
export class CoolChartComponent implements OnInit {

  @ViewChild('chart') el: ElementRef;
  @ViewChild('lighttoggle') md: MatSlideToggle;
  
  constructor(public fdb: AngularFireDatabase) { }

  photoresistorValue: number;
 
  ngOnInit() {

    const cloudRef = this.fdb.object('sensor_log/button').valueChanges();
    cloudRef.subscribe(v => {
      console.log(v);

      this.md.checked = <boolean>((<any>v).value);
    });  
    
    const cloudRef2 = this.fdb.object('sensor_log/photoresistor').valueChanges();
    cloudRef2.subscribe(v => {
        this.photoresistorValue = <number>((<any>v).value);
        this.basicChart(this.photoresistorValue);
    });  

  }

  counter: number = 0;
  data = [{
    x: [],
    y: []
  }]
  style = {
    margin: { t: 0 }
  }

  basicChart(value: number) {
    const element = this.el.nativeElement;
 
    this.data[0].x.push(this.counter++);
    this.data[0].y.push(value);
 
    Plotly.purge(element);
    Plotly.plot( element, this.data, this.style );
  }

  light()
  {
    this.fdb.object('sensor_log/button').set({
      value: this.md.checked,
      dt_create: Date()
  });
  }
}
