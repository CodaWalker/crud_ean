import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../product.service';
import { MatSnackBar } from '@angular/material';
import * as moment from 'moment';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})

export class CreateComponent implements OnInit {

  today: string = moment().format('L');
  createForm: FormGroup;

  constructor(private productService: ProductService, private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar) {
    this.createForm = this.fb.group({
      name: ['', Validators.required],
      sku: ['', Validators.required],
      price: [null, Validators.required],
      createdAt: ''
    });
  }

  ngOnInit() {}

  addProduct(name, sku, price) {

    this.productService.addProduct(name, sku, price, this.today).subscribe(() => {
      this.snackBar.open('Product '+ name +' created successfully', 'OK', {
        duration: 3000
      });
    this.router.navigate(['/list']);
    });
  }

 }
