import { Component, OnInit } from '@angular/core';
import { Dashboard } from 'src/app/model/Dashboard.model';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {


  //More information
  basicData: any;
  basicOptions: any;

  data: any;
  chartOptions: any;

  stackedData: any;
  stackedOptions: any;


  te: number;
  tm: number;
  tp: number;
  dnv:number;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.globalDashboard().subscribe((d) => this.global(d));
    this.data = {
      labels: ['A', 'B', 'C'],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726'],
          hoverBackgroundColor: ['#64B5F6', '#81C784', '#FFB74D'],
        },
      ],
    };
  }

  global(dashboard: Dashboard) {
    this.te = dashboard.totalEmployee;
    this.tm = dashboard.totalManger;
    this.tp = dashboard.totalProject;
    this.dnv= dashboard.taskDoneNoVerified;
    this.basicData = {
      labels: Object.keys(dashboard.projectDuration),
      datasets: [
        {
          label: 'project',
          backgroundColor: '#4b9bd4',
          data: Object.values(dashboard.projectDuration),
        },
      ],
    };

    this.data = {
      labels: ['Done Project', 'In Progress Project'],
      datasets: [
        {
          data: [dashboard.doneProject,dashboard.inProgressProject],
          backgroundColor: ['#42A5F5',  '#FFA726'],
          hoverBackgroundColor: ['#64B5F6', '#FFB74D'],
        },
      ],
    };



    this.stackedData = {
      labels: dashboard.projectName,
      datasets: [{
          type: 'bar',
          label: 'ToDo',
          backgroundColor: '#FFCDD2',
          data: dashboard.projectTaskTodo
      }, {
          type: 'bar',
          label: 'In Progress',
          backgroundColor: '#FEEDAF',
          data: dashboard.projectTaskInProgress
      }, {
          type: 'bar',
          label: 'Done',
          backgroundColor: '#B3E5FC',
          data: dashboard.projectTaskDone
      }]
  };




  this.stackedOptions = {
    plugins: {
        tooltips: {
            mode: 'index',
            intersect: false
        },
        legend: {
            labels: {
                color: '#495057'
            }
        }
    },
    scales: {
        x: {
            stacked: true,
            ticks: {
                color: '#495057'
            },
            grid: {
                color: '#ebedef'
            }
        },
        y: {
            stacked: true,
            ticks: {
                color: '#495057'
            },
            grid: {
                color: '#ebedef'
            }
        }
    }
};

  }
}