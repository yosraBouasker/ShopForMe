import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiContactService } from 'src/app/shared/api-contact.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
messages;
  constructor(public http: HttpClient, private contactApi: ApiContactService) { }

  ngOnInit(): void {
    this.contactApi.getMessages().subscribe((res: any) => {
      this.messages = res.data;
      console.log(res)
    });
  }
}
