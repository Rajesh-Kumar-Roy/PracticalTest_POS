import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';

import { PosFooterComponent } from "./pos-footer/pos-footer.component";
import { CommonModule } from '@angular/common';
import { PosHeaderComponent } from './pos-header/pos-header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../core/services/product.service';
import { Product, ProductBrand, ProductType } from '../../shared/models/product.model';
import { debounceTime, distinctUntilChanged, Subject, switchMap, timeout } from 'rxjs';
import { PosParams } from '../../shared/models/posParam.model';
import { PagerComponent } from "../../shared/components/pager/pager.component";
import { CustomerCreateComponent } from "../customer-create/customer-create.component";
import { ModalComponent } from "../../shared/components/modal/modal.component";
import {Location} from '@angular/common';
import { CustomerService } from '../../core/services/customer.service';
import { Customer } from '../../shared/models/customer.model';
import { Order } from '../../shared/models/order.model';
import { OrderStatus } from '../../shared/models/orderStatus.model';
import { PosService } from '../../core/services/pos.service';
import { ToastrService } from 'ngx-toastr';
import { OrderItem } from '../../shared/models/orderItems.model';
import { Cart } from '../../shared/models/cart.model';
import { OrderPaymentComponent } from "./payment/order-payment/order-payment.component";

@Component({
  selector: 'app-pos-invoice',
  standalone: true,
  imports: [PosHeaderComponent, PosFooterComponent, CommonModule, FormsModule, PagerComponent, CustomerCreateComponent, ModalComponent],
  templateUrl: './pos-invoice.component.html',
  styleUrl: './pos-invoice.component.css'
})
export class PosInvoiceComponent implements OnInit {

  products: Product[] = [];
  productBrands: ProductBrand[] = [];
  productTypes: ProductType[] = [];
  customers: Customer[] =[];
  isModalVisible = false;
  

  cart: Cart[] = [];
  subtotal = 0;
  discount = 0;
  vat = 0;
  adjustment = 0;
  totalAmount = 0;
  private searchSubject = new Subject<string>();
  searchTerm: string = ''; // User's input

  filteredItems: Product[] = []; // Suggestions to display
  totalCount: number = 0;
  posParams!: PosParams;
  disCountAmount = 0;
  isDiscountModalVisible = false;
  selectedCustomer: number = 0;

  
  constructor(private  productService: ProductService, private _location: Location, private _customerService: CustomerService
    ,private _posService: PosService,private toastr: ToastrService,
  ) {
    this.posParams = this.productService.getPosParams();
  }

  ngOnInit(): void {
  //  this.productService.loadAll().subscribe((res: Product[])=>{
  //   this.products = [...res,...res,...res];
  //  });
  this.getProducts();
  this.getProductTypes();
  this.getProductBrands();
  this.getCustomers();
   
//working on next search
   this.searchSubject.pipe(
    debounceTime(700), // Wait for 300ms after user stops typing
    distinctUntilChanged(),
    switchMap(searchTerm => this._searchMap())
  ).subscribe(data => {
    });
  }
  // Filter items based on input
  onSearch(): void {
    if(this.searchTerm.trim() !== ''){
      this.searchSubject.next(this.searchTerm);
    }else{
      let params = new PosParams();

      this.productService.setPosParams(params);
      this.getProducts();
      this.filteredItems=[];
    }
  }
   private _searchMap(){
    let params = this.productService.getPosParams();
    params.search = this.searchTerm;
    params.pageNumber = 1;
    this.productService.setPosParams(params);
    this.getProducts(false,true); // 1st param is useCache // second is Search
    return this.filteredItems;
  }
  

  getProducts(useCache = false, onSearch = false){
    this.productService.getProducts(useCache).subscribe(response=>{
      if(!onSearch){
        this.filteredItems =[];
        this.products = response.data;
        this.totalCount = response?.count;
      }else{
        this.filteredItems = response.data;
      }
    },error=>{
      console.log(error);
    });
  }
 

  getProductBrands(){
    this.productService.loadAllBrands().subscribe((data: ProductBrand[])=>{
      this.productBrands = [{id:0, name:'All'},...data];;
     });
  }
  getProductTypes(){
    this.productService.loadAllTypes().subscribe((res: ProductType[])=>{
      this.productTypes = [{id:0, name:'All Medicine'},...res];
     });
  }
  getCustomers(){
    this._customerService.loadAll().subscribe((res: Customer[])=>{
      this.customers = [...res];
     });
  }
  onBrandSelected(event: Event){
    const params = this.productService.getPosParams();
    params.brandId = Number((event.target as HTMLSelectElement).value);
    params.pageNumber = 1;
    this.productService.setPosParams(params);
    this.getProducts();
  }

  onTypeSelected(typeId: number){
    const params = this.productService.getPosParams();
    params.typeId = typeId;
    params.pageNumber = 1;
    this.productService.setPosParams(params);
    this.getProducts();
  }
  // When a suggestion is clicked
  selectItem(name: string): void {
   // this.searchTerm = name;
    this.filteredItems = [];
    const params = this.productService.getPosParams();
    params.search = name;
    params.pageNumber = 1;
    this.productService.setPosParams(params)
    this.getProducts();
  }

  onPageChanged(event: any){
    const params = this.productService.getPosParams();
    if(params.pageNumber !== event){
      params.pageNumber = event;
      this.productService.setPosParams(params);
      this.getProducts(true);
    }
  }

  openModal() {
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
    this.isDiscountModalVisible = false;
  }
  onCustomerSelected(event: Event){
    this.selectedCustomer = Number((event.target as HTMLSelectElement).value) > 0 ? Number((event.target as HTMLSelectElement).value) : this.customers[0].id;
  }

  modalSubmit() {
    this._customerService.triggerSubmit();
    setTimeout(()=>{
      this.closeModal();
      this.getCustomers();
    },600)
  }

  onResetItems(event: any){
    if(event==true && this.cart.length > 0){
      this.cart =[];
      this.subtotal = 0;
      this.vat = 0;
      this.filteredItems = [];
      this.searchTerm ='';
      let params = this.productService.getPosParams();
      params.search = this.searchTerm;
      params.pageNumber = 1;
      this.productService.setPosParams(params);
      this.getProducts(false,false);
      this.totalAmount = 0;
    }
  }
  onDiscountAmount(value: boolean){
    if(this.subtotal>0){
      this.isDiscountModalVisible = value;
    }
    
  }
  modalDiscountCalculation(){
    this.totalAmount = this.subtotal + this.vat + this.adjustment
    this.totalAmount -= this.disCountAmount;
    this.isDiscountModalVisible = false;
    this.discount = this.disCountAmount;
    this.disCountAmount = 0;
  }

  onPaymentSubmit(event: boolean){

    if(event && this.cart.length > 0){
      let order: Order = new Order();
      order.customerId = this.selectedCustomer > 0 ? this.selectedCustomer : this.customers[0].id;
      order.status= OrderStatus.Pending;
      order.subTotal = this.subtotal;
      order.total = this.totalAmount;
      order.vatAmount = this.vat;
      order.discountAmount = this.discount,
      order.adjustmentAmount = this.adjustment;
      order.orderItems = [];

      this.cart.forEach(e => {
        let item = new OrderItem();
        item.price = e.price;
        item.productId = e.id;
        item.productName = e.name;
        item.quantity = e.qty;
        order.orderItems.push(item);
      });
     
      this.onSaveOrder(order);
    }
  }

  onSaveOrder(order: Order){
    console.log('save');
    this._posService.post(order).subscribe(res=>{
      if(res){
       this._posService.triggerPayment(res.id);
        this.toastr.success('Data Saved!', '201');
        this.onResetItems(true);
      }
    },err=>{
      this.toastr.success("Please Select All Correctly!!");
    })
  }
  addToCart(product: any) {
    console.log(product);
    const existing = this.cart.find((item) => item.name === product.name);
    if (existing) {
      existing.qty += 1;
      existing.subtotal += product.price;
       this.disCountAmount =0;
    } else {
      this.cart.push({
        ...product,
        qty: 1,
        unit: 'Pcs',
        discount: 0,
        subtotal: product.price,
      });
    }
    console.log(this.cart);
    this.updateSummary();
  }

  removeFromCart(item: any) {
    this.cart = this.cart.filter((cartItem) => cartItem.name !== item.name);
    this.updateSummary();

  }

  increaseQty(item: any) {
    item.qty += 1;
    item.subtotal = item.price * item.qty;
    this.updateSummary();
  }

  decreaseQty(item: any) {
    if (item.qty > 1) {
      item.qty -= 1;
      item.subtotal = item.price * item.qty;
      this.updateSummary();
    }
  }

  updateSummary() {
    this.subtotal = this.cart.reduce((total, item) => total + item.subtotal, 0);
    this.totalAmount = this.subtotal;
    this.discount =0;
  }
}
