import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiCategoryService } from 'src/app/shared/api-category.service';
import { ApiProductService } from 'src/app/shared/api-product.service';
import { ApiAuthService } from 'src/app/shared/api-auth.service';
import { CartService } from 'src/app/shared/cart.service';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from 'src/app/shared/profile.service';

@Component({
  selector: 'app-orders-admin',
  templateUrl: './orders-admin.component.html',
  styleUrls: ['./orders-admin.component.css']
})
export class OrdersAdminComponent implements OnInit {

  orders;
  selectedOrder;
  progToEdit;
  term;

  constructor(public http: HttpClient,private apiCategoryService: ApiCategoryService, private apiProductService: ApiProductService, 
    private activatedRoute: ActivatedRoute, private cartService: CartService, private apiService: ApiAuthService, private profileService: ProfileService) { }

  ngOnInit(): void {
    this.profileService.getAllOrders().subscribe((res: any) => {
      this.orders = res.data;
    });
  }

  getProgress(progress){
    if (progress == "25%")
      return "In progress" 
    else if (progress == "50%")
    return "Shipped"
    else if (progress == "75%")
    return "Delivered"
    else if (progress == "100%")
    return "Completed"
  }

  deleteOrder(id){
    this.profileService.deletePurchase(id).subscribe((res: any) => {
      this.ngOnInit();
    });
  }

  setSelectedOrder(order) {
    this.selectedOrder = order;
    this.progToEdit = order.progress;
  }

  editOrder(sDate1, sAdd){
    let ship= new Date(sDate1)
    var body = {
      shippingDate: ship,
      progress: this.progToEdit,
      shippingAddress: sAdd
    }
    this.profileService.updateOrder(this.selectedOrder._id, body).subscribe((res: any) => {
      this.ngOnInit();
    });
  }

  setProgress(prog: HTMLElement) {
    var progr= prog.innerHTML;
    if (progr == "In Progress")
      this.progToEdit = "25%";
      if (progr == "Shipped")
        this.progToEdit = "50%";
        if (progr == "Delivered")
          this.progToEdit = "75%";
          if (progr == "Completed")
            this.progToEdit = "100%";
  }

}
