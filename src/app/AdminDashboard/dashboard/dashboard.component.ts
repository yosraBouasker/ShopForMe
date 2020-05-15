import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiContactService } from 'src/app/shared/api-contact.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  messages;
  constructor(public http: HttpClient, private contactApi: ApiContactService) { }

  ngOnInit(): void {
    let div= document.getElementById("dashboard");
    div.className = "nav-link active";
  }

}
