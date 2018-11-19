import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import * as moment from 'moment';
import {Injectable} from "@angular/core";
import { ProductService } from '../../product.service';

@Injectable()
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})

export class EditComponent implements OnInit {
  today: string = moment().format('L');
  id: String;
  product: any = {};
  updateForm: FormGroup;
  // tslint:disable-next-line:max-line-length
  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar, private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.productService.getProductById(this.id).subscribe(res => {
      this.product = res;
      this.updateForm.get('name').setValue(this.product.name);
      this.updateForm.get('sku').setValue(this.product.sku);
      this.updateForm.get('price').setValue(this.product.price);
      this.updateForm.get('createdAt').setValue(this.product.createdAt);
      },
      error => {
        if(error.status === 404){
        this.router.navigateByUrl('/not-found/'+ this.id, {replaceUrl: true});
      }
      else
        this.router.navigateByUrl('/', {replaceUrl: true});
        console.log(error)
      }
      );
    });
  }

  createForm() {
    this.updateForm = this.fb.group({
      name: ['', Validators.required],
      sku: ['', Validators.required],
      price: [null, Validators.required],
      createdAt: ''
    });
  }

  updateProduct(name, sku, price, createdAt) {
    this.productService.updateProduct(this.id, name, sku, price, createdAt).subscribe(() => {
      this.snackBar.open('Product '+ name +' updated successfully', 'OK', {
        duration: 3000
      });
    });
  }


  }
