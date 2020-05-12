import { Component, OnInit } from '@angular/core';
import { ApiAuthService } from 'src/app/shared/api-auth.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients;
  constructor(private apiAuthService: ApiAuthService) { }

  ngOnInit(): void {
    this.apiAuthService.getClients().subscribe((res: any) => {
      this.clients = res.data;
    });
  }

  deleteClient(id){
    this.apiAuthService.deleteClient(id).subscribe((res: any) => {
      this.apiAuthService.getClients().subscribe((ress: any) => {
        this.clients = ress.data;
      });
    });
  }

}
