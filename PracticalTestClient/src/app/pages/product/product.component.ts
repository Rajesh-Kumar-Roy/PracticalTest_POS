import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../shared/models/product.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule, RouterModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  productForm!: FormGroup;
  productModel!: Product;

  constructor(private fb: FormBuilder, private router: Router,private toastr: ToastrService, private productService: ProductService){}


  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(){
    this.productForm = this.fb.group({
       id: [0],
       name: ['', [Validators.required]],
       price: ['', [Validators.required]],
     });
   }

   onSubmit(): void {
    if (this.productForm.valid) {
      this.productModel = this.productForm.value;
      this.productService.post(this.productModel).subscribe((res: any)=>{
        if(res.statusCode==201){
          this.toastr.success(res.message, res.statusCode);
          this.router.navigate(['/productlist']);
        }
      })
    }
  }
}
