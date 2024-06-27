import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  products :any[]=[]
  totalPrice = 0
  

 public payPalConfig ? : IPayPalConfig;
 showSuccess:boolean =false
 makepaymentStatus:boolean=false


 date: string = '';
  deliveryDate: string = '';

  ngOnInit(): void {
 this.getcartitem()
 this.initConfig();
 this.setDateAndDeliveryDate()
  }
  constructor(private api:ApiService,private route:Router){
  }

  getcartitem(){
    if(sessionStorage.getItem("token")){
      this.api.getcartlist().subscribe({
        next:(res:any)=>{
          this.products=res
          this.getcartTotal()
          this.api.getcartcount()

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
      this.route.navigateByUrl('/')

    }
  
}

  deletefromcart(id:any){
    if(sessionStorage.getItem("token")){
    this.api.deletecart(id).subscribe((res:any)=>{
      console.log('delete succesfully');
      Swal.fire({
        title: 'Product deleted succesfully!',
        
      })
    
      this.getcartitem()
      this.api.getcartcount()
    })
  }
  }

  getcartTotal(){
    let total = 0
    this.products.forEach((item:any)=>{
      total += item.grandtotal
      this.totalPrice = total
    })
  }
  
  cartincrement(id:any){
    if(sessionStorage.getItem("token")){
    this.api.incrementCart(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.getcartitem()
        this.api.getcartcount()
        
      }

    })

  }
  }

  
 cartDecrement(id:any){
  if(sessionStorage.getItem("token")){
  this.api.decrementCart(id).subscribe({
    next:(res:any)=>{
   console.log(res);
   this.getcartitem()
   this.api.getcartcount()

   
    },
    error:(err:any)=>{
      console.log(err);
      
    }
  })
}
 }






  private initConfig(): void {
    this.payPalConfig = {
    currency: 'EUR',
    clientId: 'sb',
    createOrderOnClient: (data) => <ICreateOrderRequest>{
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'EUR',
            value: '9.99',
            breakdown: {
              item_total: {
                currency_code: 'EUR',
                value: '9.99'
              }
            }
          },
          items: [
            {
              name: 'Enterprise Subscription',
              quantity: '1',
              category: 'DIGITAL_GOODS',
              unit_amount: {
                currency_code: 'EUR',
                value: '9.99',
              },
            }
          ]
        }
      ]
    },
    advanced: {
      commit: 'true'
    },
    style: {
      label: 'paypal',
      layout: 'vertical'
    },
    onApprove: (data, actions) => {
      console.log('onApprove - transaction was approved, but not authorized', data, actions);
      actions.order.get().then((details:any) => {
        console.log('onApprove - you can get full order details inside onApprove: ', details);
      });
    },
    onClientAuthorization: (data) => {
      console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      this.showSuccess = true;
    },
    onCancel: (data, actions) => {
      console.log('OnCancel', data, actions);
    },
    onError: err => {
      console.log('OnError', err);
    },
    onClick: (data, actions) => {
      console.log('onClick', data, actions);
    },
  };
  }
  makepayment(){
    this.makepaymentStatus =true

  }

  setDateAndDeliveryDate() {
    const currentDate = new Date();
    this.date = currentDate.toISOString().substring(0, 10); 
    const deliveryDate = new Date();
    deliveryDate.setDate(currentDate.getDate() + 5); 
    this.deliveryDate = deliveryDate.toISOString().substring(0, 10);
  }
 

  checkout(){
    sessionStorage.setItem('total',JSON.stringify(this.totalPrice))
  }

   
}


