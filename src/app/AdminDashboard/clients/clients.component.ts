import { Component, OnInit } from '@angular/core';
import { ApiAuthService } from 'src/app/shared/api-auth.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients;
  config;
  constructor(private apiAuthService: ApiAuthService) { }

  ngOnInit(): void {
    this.apiAuthService.getClients().subscribe((res: any) => {
      this.clients = res.data;
      console.log(this.clients)
      this.config = {
        itemsPerPage: 1,
        currentPage: 1,
        totalItems: this.clients.length
      };
      
    });
  }

  deleteClient(id){
    this.apiAuthService.deleteClient(id).subscribe((res: any) => { 
      this.apiAuthService.getClients().subscribe((ress: any) => {
        this.clients = ress.data;
      });
    });
  }

  pageChanged(event){
    this.config.currentPage = event;
  }

}
