import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loginUsername:string=""
  wishlistcount :number =0
  cartCount :number=0

  constructor(private api:ApiService , private route:Router, ){}
  
//   ngOnInit(): void {
//     if(sessionStorage.getItem("username")){
//       this.loginUsername = sessionStorage.getItem ("username") || ""
//       this.api.wishlistcount.subscribe((res:any)=>{
//         this.wishlistcount =res
//       })
//       this.api.cartcount.subscribe((res:any)=>{
//         this.cartCount = res
//       })
//     }
//     else{
//       this.loginUsername =" "
//     }
//   }
  
// logout(){
//   sessionStorage.removeItem("username")
//   sessionStorage.removeItem("token")
//   setTimeout(() => {
//     Swal.fire({
//       title: 'Logout Successful!',
//       confirmButtonText: 'Back'
//     }).then(() => {
//       this.route.navigateByUrl('/')
//         .then(() => {
//           window.location.reload();
//         });
//     });
//   }, 1000); 


// }
//   search(event:any){
//     this.api.searchTerm.next(event.target.value)
//     console.log(event.target.value);
    
//   }

// }

ngOnInit(): void {
  const username = sessionStorage.getItem('username');
  if (username) {
    this.loginUsername = username;
    this.api.wishlistcount.subscribe((res: any) => {
     this.wishlistcount=res
    });
    this.api.cartcount.subscribe((res: any) => {
      this.cartCount = res;
    });
  } else {
    this.loginUsername = '';
  }
  this.api.getwishlistcount()
}

logout(): void {
  sessionStorage.removeItem('username');
  sessionStorage.removeItem('token');
  setTimeout(() => {
    Swal.fire({
      title: 'Logout Successful!',
    }).then(() => {
      this.route.navigateByUrl('/').then(() => {
        window.location.reload();
      });
    });
  }, 1000);
}

search(event: any): void {
  this.api.searchTerm.next(event.target.value);
  console.log(event.target.value);
}
}
