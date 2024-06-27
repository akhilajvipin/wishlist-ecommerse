import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

    wishlistArray :any=[]
       product: any;
  constructor(private api:ApiService,private route:Router){}
  ngOnInit(): void {
    this.getWishlistProduct()
  }

  getWishlistProduct(){
    if(sessionStorage.getItem('token')){
      this.api.getWishlist().subscribe({
        next:(res:any)=>{
          console.log(res); 
          this.wishlistArray=res
          this.api.getwishlistcount()
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
        confirmButtonText: 'Back'

        
      })
      this.route.navigateByUrl('/')
    }
  }

  deleteWishlistProduct(id:any){
    this.api.deletewishlist(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.getWishlistProduct()
        this.api.getwishlistcount()
        
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
   
     
     }

addTocart(product:any){
    if(sessionStorage.getItem("token")){
      Object. assign(product,{quantity:1})
      console.log(product);
      this.api.addtoCart(product).subscribe({
        next:(res:any)=>{
          this.deleteWishlistProduct(product._id)
          this.api.getcartcount()
          Swal.fire({
            text: 'WOW..product Added succesfully',
            icon: 'success',
            
          })
          this.route.navigateByUrl('/user/cart')
          

        },
        error:(err:any)=>{
          Swal.fire({
            text: 'oop....',
            icon: 'error',
            
          })
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