

import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private fb: FormBuilder, private api: ApiService, private route: Router) {}

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
  });

  login() {
    
    if(this.loginForm.valid){
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      console.log(email,password);


      const user = {email,password}
      this.api.login(user).subscribe({
        next:(res:any)=>{
          console.log(res);

          sessionStorage.setItem("username",res.existingUser.username)
            const token = res.token
            sessionStorage.setItem('token',token)

          Swal.fire({
            title: 'Success!',
            text: 'Wow...Login Success',
            icon: 'success',
            confirmButtonText: 'Back'
            
          })
          this.route.navigateByUrl('/')
          this.api.getcartcount()
          this.api.getwishlistcount()
        }
        ,
        error:(err)=>{
          Swal.fire({
            title: 'Error!',
            text: 'login failed',
            icon: 'error',
            confirmButtonText: 'Back'
          })
        }
      })
    }
    else{
      Swal.fire({
        text: 'Invalid',
        icon: 'error',
        confirmButtonText: 'Back'
      })
    }

  }
  }

  