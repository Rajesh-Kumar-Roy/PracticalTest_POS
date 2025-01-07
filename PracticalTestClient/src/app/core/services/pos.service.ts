import { inject, Injectable } from '@angular/core';
import { MasterService } from './master/master.service';
import { environment } from '../../Environments/environment';
import {  BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Order } from '../../shared/models/order.model';
import { OrderInvoiceDto } from '../../shared/models/orderInvoice.model';

@Injectable({
  providedIn: 'root'
})
export class PosService {

    baseService = inject(MasterService);
    url = `${environment.apiUrl}pos`;
    private paymentEvent = new BehaviorSubject<number>(0);
    paymentForm$: Observable<number> = this.paymentEvent.asObservable();

    constructor(private _http: HttpClient) { }
  
    post(obj: Order): Observable<Order>{
      return this.baseService.post<Order>(`${this.url}/SaveWithReturnNew`, obj);
    }
  
    // loadAll():Observable<Product[]>{
    //   return this.baseService.get<Product[]>(this.url);
    // }
 
    getOrderWithItemById(id: number): Observable<Order>{
      return this.baseService.get<Order>(`${this.url}/${id}`);
    }
    triggerPayment(id: number): void {
      this.paymentEvent.next(id);
    }
  

    getOrderInvoiceDataByOrderId(id:number): Observable<OrderInvoiceDto>{
      return this.baseService.get<OrderInvoiceDto>(`${this.url}/GetOderInvoiceData/${id}`);
    }
}
