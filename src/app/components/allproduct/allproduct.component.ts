




import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-allproduct',
  templateUrl: './allproduct.component.html',
  styleUrls: ['./allproduct.component.css']
})
export class AllproductComponent implements OnInit {

  allProducts: any[] = [];
  filteredProducts: any[] = [];
  searchkey: string = "";
  product: any = [];
  sortCriterion: string = '';

  constructor(private api: ApiService, private routes: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getProducts();
    this.api.searchTerm.subscribe((data: any) => {
      this.searchkey = data;
      this.filterProducts();
    });
  }

  getProducts() {
    this.api.getAllProducts().subscribe((products: any) => {
      console.log(products);
      this.allProducts = products;
      this.api.getcartcount();
      this.api.getwishlistcount();
      this.filterProducts(); // Apply filtering and sorting after fetching products
    });
  }

  search(event: any): void {
    this.searchkey = event.target.value;
    this.filterProducts();
  }

  addwishlist(product: any) {
    if (sessionStorage.getItem('token')) {
      this.api.addToWishlist(product).subscribe({
        next: (res: any) => {
          console.log(res);
          Swal.fire({
            title: 'Product Added to Wishlist!',
            icon: 'success',
          });
          this.api.getwishlistcount();
        },
        error: (err: any) => {
          console.log(err);
          Swal.fire({
            title: 'Error',
            text: 'Oops..Item Already in wishlist',
            icon: 'error',
          });
        }
      });
    } else {
      Swal.fire({
        text: 'Please, Login',
        icon: 'info',
        confirmButtonText: 'Back'
      });
    }
  }

  sortProducts() {
    if (this.sortCriterion === 'price-asc') {
      this.filteredProducts.sort((a, b) => a.price - b.price);
    } else if (this.sortCriterion === 'price-desc') {
      this.filteredProducts.sort((a, b) => b.price - a.price);
    } else if (this.sortCriterion === 'name-asc') {
      this.filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (this.sortCriterion === 'name-desc') {
      this.filteredProducts.sort((a, b) => b.title.localeCompare(a.title));
    }
  }

  onSortChange(event: any): void {
    this.sortCriterion = event.target.value;
    this.sortProducts();
  }

  filterProducts() {
    this.filteredProducts = this.allProducts.filter(product =>
      product.title.toLowerCase().includes(this.searchkey.toLowerCase())
    );
    this.sortProducts();
  }
}
