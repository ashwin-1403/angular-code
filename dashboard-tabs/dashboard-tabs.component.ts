import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ApisService } from 'src/app/services/apis.service';

@Component({
  selector: 'app-dashboard-tabs',
  templateUrl: './dashboard-tabs.component.html',
  styleUrls: ['./dashboard-tabs.component.css']
})
export class DashboardTabsComponent implements OnInit {
  riverId: any;
  search: any;
  facilityId: any;
  tabType: number;
  facilityName: any;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private apisService: ApisService) { }

  ngOnInit(): void {
    this.riverId = this.route.snapshot.queryParams['riverId'];
    this.search = this.route.snapshot.queryParams['search'];
    this.facilityId = this.route.snapshot.params['facilityId'];
    this.getFacilityById();
    let currentPath = this.location.path();

    if (currentPath.includes("alerts-notifications")) {
      this.tabType = 1;
    }

    if (currentPath.includes("short-term-schedule")) {
      this.tabType = 2;
    }

    if (currentPath.includes("long-term-schedule")) {
      this.tabType = 3;
    }

    if (currentPath.includes("facility-information")) {
      this.tabType = 4;
    }
  }

  getFacilityById() {
    this.apisService.getSingleFacility(this.facilityId)
      .subscribe(
        res => {
          this.facilityName = res.data.name
        },
        error => {
          console.log(error);
        });
  }

  goToRoute(type) {

    this.tabType = type;
    let params: any = {}

    if (this.riverId) {
      params.riverId = this.riverId;
    }

    if (this.search) {
      params.search = this.search;
    }

    if (type == 1) {
      this.router.navigate(['dashboard/facilities/', this.facilityId, 'alerts-notifications'], { queryParams: params })
    }

    if (type == 2) {
      this.router.navigate(['dashboard/facilities/', this.facilityId, 'short-term-schedule'], { queryParams: params })
    }

    if (type == 3) {
      this.router.navigate(['dashboard/facilities/', this.facilityId, 'long-term-schedule'], { queryParams: params })
    }

    if (type == 4) {
      this.router.navigate(['dashboard/facilities/', this.facilityId, 'facility-information'], { queryParams: params })
    }

  }

  goBack() {
    let params: any = {}

    if (this.search) {
      params.search = this.search;
    } else if (this.riverId) {
      params.riverId = this.riverId;
    }

    this.router.navigate(['dashboard/facilities'], { queryParams: params })
  }

}
