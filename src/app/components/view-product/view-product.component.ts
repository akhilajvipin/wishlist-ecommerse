import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
  product:any={}

  constructor(private route:ActivatedRoute,private api:ApiService,private routes:Router){}

  ngOnInit(): void {
    this.viewProducts()

  }

  viewProducts(){
    this.route.params.subscribe((res)=>{
      const {id}= res
      this.api.getAproduct(id).subscribe((res:any)=>{
     console.log(res);
     this.product = res
      })
    })
  }


addwishlist(){
  if(sessionStorage.getItem('token')){
    this.api.addToWishlist(this.product).subscribe({
      next:(res:any)=>{
        console.log(res);
        Swal.fire({
          title: 'Product Added to Wishlist!',
          icon: 'success',
          confirmButtonText: 'Back'
        })
        this.api.getwishlistcount()
        
      },error:(err:any)=>{
        console.log(err);
        Swal.fire({
          title: 'Error',
          text: 'oopss..Item Already in wishlist',
          icon: 'error',
        })
        
      }
    })

  }
  else{
    Swal.fire({
            text: 'Please, Login',
            icon: 'info',
          })

  }


}

addTocart(product:any){
  if(sessionStorage.getItem("token")){
    Object. assign(product,{quantity:1})
    console.log(product);
    this.api.addtoCart(product).subscribe({
      next:(res:any)=>{
        Swal.fire({
            text: 'WOW..product Added succesfully',
            icon: 'success',
            
          })
        this.api.getcartcount()
        this.routes.navigateByUrl('/user/cart')

        


      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }
  else{
    Swal.fire({
      text: 'Please Login',
      icon: 'info',
      
    })
  }
 




}
}
