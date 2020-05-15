import { Component, OnInit } from '@angular/core';
import { ApiAuthService } from 'src/app/shared/api-auth.service';
import { ProfileService } from 'src/app/shared/profile.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients;
  constructor(private apiAuthService: ApiAuthService, private profileService: ProfileService) { }

  ngOnInit(): void {
    let div= document.getElementById("clients");
    div.className = "nav-link active";
    this.apiAuthService.getClients().subscribe((res: any) => {
      this.clients = res.data;
    });
  }

  getProfileImg(image): string {
      if(image != undefined && image != null){
        return "http://localhost:3000/" + image;
      }
      else {
        return 'http://ssl.gstatic.com/accounts/ui/avatar_2x.png';
      }
  }

  deleteClient(id){
    this.apiAuthService.deleteClient(id).subscribe((res: any) => {
      this.apiAuthService.getClients().subscribe((ress: any) => {
        this.clients = ress.data;
      });
    });
  }

}
