import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../product.model';
import { ProductService } from '../../product.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  products: Product[];
  name: '';
  displayedColumnsProducts = ['name', 'sku', 'price', 'createdAt', 'actions'];
  constructor(
              private router: Router,
              private productService: ProductService,
              private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.productService
      .getProducts()
      .subscribe((data: Product[]) => {
        this.products = data;
        console.log('Data requested products...');
      },
        error => {
          if(error.status === 404){
            console.log('No connection to Json DB');
            alert('No connection to Json DB');
          }
          else
          console.log(error)
        }




      );

  }
  editProduct(id) {
    this.router.navigate([`/edit/${id}`]);
  }

  deleteProduct(id,name) {
    this.name = name;
    this.productService.deleteProduct(id).subscribe(() => {
      this.fetchProducts();
      this.snackBar.open('Product '+ this.name +' deleted successfully', 'OK', {
        duration: 3000
      });
    });
  }

}
