import { Component, OnInit } from '@angular/core';
import { ApiAuthService } from '../shared/api-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private apiService: ApiAuthService) { }

  ngOnInit(): void {
  }

  isConnected() {
    this.apiService.decodeToken();
    return (this.apiService.userId != undefined && this.apiService.userId != null);
  }
  
  logout(){
    this.apiService.logout();
    document.location.reload();
  }
}
