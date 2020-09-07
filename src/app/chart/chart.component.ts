import { Component, OnInit } from '@angular/core';
import { ChartService } from '../services/chart.service';
//import 'rxjs/add/operator/map';
import { Chart } from 'chart.js';
 
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  [x: string]: any;
  chart = [];
  length = Object;
  public chartArray: Chart;
  
  constructor(private chartService: ChartService) {  } 
  
  ngOnInit() {  
    let chart = <any> {};
    this.chartService.readLaunches().subscribe((res:any) => {    
      console.log(res);
 
      var yearsData = []
      var failsData = []
      var timelines = []

    for(var n=0; n<res.length; n++) {      
      if(failsData.length != 5) {           
        if((n-1) != undefined && failsData.length > 1 && yearsData[n-1] == res[n].launch_year) {
          if(failsData[n-1] < failsData[n]) {
            failsData[n-1]=failsData[n];
          }
        } else {
          var a1 = yearsData.includes(res[n].launch_year);
          if(false === a1) {
            failsData.push((res[n].launch_failure_details!=undefined) ? res[n].launch_failure_details.time:0)
            yearsData.push(res[n].launch_year) 
            timelines.push((res[n].timeline!=undefined) ? res[n].timeline.webcast_liftoff:0)
          }
        }
      } else {        
        if(failsData.length != 5 ) {
        if((n-1) != undefined && failsData.length > 1 && yearsData[n-1] == res[n].launch_year) {
          if(failsData[n-1] < failsData[n]) {
            failsData[n-1]=failsData[n];
          }
        }
        } else {
          var a1 = yearsData.includes(res[n].launch_year);
          if(false === a1) {
            failsData.push((res[n].launch_failure_details!=undefined) ? res[n].launch_failure_details.time:0)
            yearsData.push(res[n].launch_year) 
            timelines.push((res[n].timeline!=undefined) ? res[n].timeline.webcast_liftoff:0)
          }
        }           
      }  
    }

    function ArrayInGroups(yearsData, num) {
      return yearsData.reduce(function(r,v, i) {
        if (i % num == 0) r.push(yearsData.slice(i, i + num));
        return r;
      }, []);
    }    
    var finalData = []
    finalData = ArrayInGroups(yearsData, 5);


      // ChartJs code
      this.chartArray = new Chart('canvas1', {
       type: 'bar',
       data: {
         labels: finalData,
         datasets: [
           { 
             data: failsData, 
             label: 'launch_failure_details', 
             borderColor: "#556B2F", 
             fill: false, 
             borderCapStyle: 'butt', 
             backgroundColor: '#0000FF', 
             borderWidth: 2, 
          },           
          { 
             data: timelines,
             label: 'timeline', 
             borderColor: "#3cba9f", 
             fill: false, 
             borderCapStyle: 'butt', 
             backgroundColor: '#76F4E9', 
             borderWidth: 2,  
          },
         ]  
       },
       options: {
          responsive: true,          
          title: { display: true, text: 'Launch year data' },
          legend: { display: true, position: 'top',  },
          scales: { 
              xAxes: [{ display: true }],
              yAxes: [{ display: true }],             
          }
       }       
      });
    });
}
}