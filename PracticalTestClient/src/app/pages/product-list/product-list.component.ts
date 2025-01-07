import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductComponent } from "../product/product.component";
import { Router, RouterModule } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../shared/models/product.model';



@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductComponent, RouterModule,NgFor],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
 
  productData: Product[] = [];
  constructor( private router: Router, private productService: ProductService){}
 
 
  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(){
    this.productService.loadAll().subscribe((res:Product[])=>{
      this.productData = res;
    });
  }
  onCreateProduct(){
    this.router.navigate(['/product']);
  }

  
}
