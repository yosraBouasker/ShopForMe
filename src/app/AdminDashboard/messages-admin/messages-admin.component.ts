import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiContactService } from 'src/app/shared/api-contact.service';

@Component({
  selector: 'app-messages-admin',
  templateUrl: './messages-admin.component.html',
  styleUrls: ['./messages-admin.component.css']
})
export class MessagesAdminComponent implements OnInit {
  messages;
  constructor(public http: HttpClient, private contactApi: ApiContactService) { }

  ngOnInit(): void {
    let div= document.getElementById("messages");
    div.className = "nav-link active";

    this.contactApi.getMessages().subscribe((res: any) => {
      this.messages = res.data;
      console.log(res)
    });
  }

  deleteMessage(id){
    this.contactApi.deleteMessage(id).subscribe((res: any) => {
      this.ngOnInit();
    });
  }

}
