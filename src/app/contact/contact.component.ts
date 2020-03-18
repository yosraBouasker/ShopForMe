import { Component, OnInit } from '@angular/core';
import { ApiContactService } from '../shared/api-contact.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
 
  messageForm: FormGroup;
  constructor(private apiService: ApiContactService, private router: Router) {
    this.messageForm = new FormGroup({
      fullName: new FormControl('', []), 
      email: new FormControl('',[Validators.email, Validators.required]), 
      text: new FormControl('', []), 
    })
  }

  ngOnInit(): void {
  }

  messageBtn() {
    if (this.messageForm.valid) {
      this.apiService.addMessage(this.messageForm.value).subscribe((res: any) => {
        alert("Your message has been successfully sent!");
        window.location.reload();
      })
    }
    else {
      console.log("no");
    }
  } 

}
