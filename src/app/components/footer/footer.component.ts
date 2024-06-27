import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  email: string = '';
  suggestion: string = '';

  constructor(private api: ApiService) {}

  onSubmit() {
    const data = {
      email: this.email,
      suggestion: this.suggestion
    };

    this.api.suggestion(data).subscribe({
      next: (res: any) => {
        console.log('Suggestion submitted successfully', res);
        Swal.fire({
          title: 'Thank you for your feedback!',
          icon: 'success',
          confirmButtonText: 'Back'
          
        })

        this.email = '';
        this.suggestion = '';
      },
      error: (err: any) => {
        console.error('Error submitting suggestion', err);
      }
    });
  }
  

}

