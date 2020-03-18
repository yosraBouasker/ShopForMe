import { Component, OnInit } from '@angular/core';
import { ApiProductService } from '../shared/api-product.service';
import { ActivatedRoute } from '@angular/router'; 

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {

  product;
  
  constructor(private apiService: ApiProductService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    //this.apiService.decodeToken();
    const id = this.activatedRoute.snapshot.paramMap.get('id')
    console.log(id)

    this.apiService.getProduct(id).subscribe((res: any) => {
      console.log(res.data);
      this.product = res.data;
    })
  }

  getFinalPrice() : number{
    
    var dis = document.getElementById("discount");

    if (this.product.discount == 0){
      dis.style.visibility = "hidden";
      return this.product.price;
    }
    else {
      var initialPrice= this.product.price - (this.product.price*this.product.discount)/100;
      return initialPrice;
    }
  }
    
  

}
