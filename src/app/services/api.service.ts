import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseurl = "https://cosmetic-website.onrender.com"

  wishlistcount = new BehaviorSubject(0)

  cartcount = new BehaviorSubject(0)

  searchTerm =new BehaviorSubject("")
  

  constructor(private http:HttpClient){
    if(sessionStorage.getItem("token")){
      this.getwishlistcount()
      this.getcartcount()
    }
  }
  register(user:any){
    return this.http.post(`${this.baseurl}/user/register`,user)
  }
  
  login(user:any){
    return this.http.post(`${this.baseurl}/user/login`,user)
  }

  getAllProducts(){
    return this.http.get(`${this.baseurl}/all-products`)
  }
  
  //view that product
  getAproduct(id:any){
    return this.http.get(`${this.baseurl}/view-product/${id}`)
  }

  appendToken(){
    let headers = new HttpHeaders()
     const token = sessionStorage.getItem('token')
     if(token){
      headers=headers.append("Authorization",`Bearer ${token}`)
     }
     return {headers}
  }
  //add to wishlist
  addToWishlist(product:any){
    return this.http.post(`${this.baseurl}/wishlist`,product, this.appendToken())
  }
  //to get the wishlist
  getWishlist(){
    return this.http.get(`${this.baseurl}/get-wishlist`, this.appendToken())
    
  }

  getwishlistcount(){
    this.getWishlist().subscribe((res:any)=>{
      this.wishlistcount.next(res.length)
    })

  }

  deletewishlist(id:any){
    return this.http.delete(`${this.baseurl}/deleteitem/${id}`,this.appendToken())
  }
  //add to cart
  addtoCart(product:any){
  return this.http.post(`${this.baseurl}/add-cart`,product,this.appendToken())
 }


 //to get cart
getcartlist(){
  return this.http.get(`${this.baseurl}/get-cart`, this.appendToken())
}

getcartcount(){
  this.getcartlist().subscribe((res:any)=>{
    this.cartcount.next(res.length)

  })

}

deletecart(id:any){
  return this.http.delete(`${this.baseurl}/delete-cart/${id}`,this.appendToken())
}

incrementCart(id:any){
  return this.http.get(`${this.baseurl}/increment-cart/${id}`,this.appendToken())
}

decrementCart(id:any){
  return this.http.get(`${this.baseurl}/decrement-cart/${id}`,this.appendToken())
}

addtoCartin(product:any){
  return this.http.post(`${this.baseurl}/add-cartin`,product,this.appendToken())
}

suggestion(data:any){
  return this.http.post(`${this.baseurl}/suggestion`,data, this.appendToken())

}



}
