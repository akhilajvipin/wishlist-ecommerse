import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css']
})
export class PaypalComponent {

  proceedToPayStatus:boolean=false
  makepaymentStatus:boolean =false

  grandTotal:any =""

  public payPalConfig ? : IPayPalConfig;

 


  CheckoutForm= this.fb.group({
    name:["",[Validators.pattern('[a-zA-Z ]*')]],
    email:["",[Validators.pattern('[a-zA-Z0-9@.]*')]],
    mobile:["",[Validators.pattern('[0-9,-]*')]],
    currentaddress:["",[Validators.pattern('[a-zA-Z0-9.:,() ]*')]],
    address:["",[Validators.pattern('[a-zA-Z0-9.:,() ]*')]],
  })

  constructor(private fb:FormBuilder,private api:ApiService, private route:Router){}

  cancel(){
    this.CheckoutForm.reset()
  }
  proceedToPay(){
    if(this.CheckoutForm.valid){
      this.proceedToPayStatus = true
    this.grandTotal=  sessionStorage.getItem("total")
    }
    else{
      alert('please enter valid input')
    }
  }


  makepayment(){
    this.makepaymentStatus= true
    this.initConfig()

  }


  private initConfig(): void {
    this.payPalConfig = {
        currency: 'USD',
        clientId: 'sb',
        createOrderOnClient: (data) => < ICreateOrderRequest > {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'USD',
                    value: this.grandTotal,
                    breakdown: {
                        item_total: {
                            currency_code: 'USD',
                            value: this.grandTotal
                        }
                    }
                },
                
            }]
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
        this.api.getcartcount()
        alert('payment succesfull')
        this.proceedToPayStatus =false
        this.makepaymentStatus = false
        this.route.navigateByUrl('/')
          },
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);
            this.proceedToPayStatus =true
            
        },
        onError: err => {
            console.log('OnError', err);
            alert('transaction failed please try again')
            this.proceedToPayStatus =true
        },
        onClick: (data, actions) => {
            console.log('onClick', data, actions);
        }
    };
}


}


// sb-jiapq29480390@personal.example.com

// T_x.7M<v