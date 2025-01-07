import { inject, Injectable } from '@angular/core';
import { MasterService } from './master/master.service';
import { environment } from '../../Environments/environment';
import { OrderPayment } from '../../shared/models/order.payment.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { OrderInvoiceDto } from '../../shared/models/orderInvoice.model';

@Injectable({
  providedIn: 'root'
})
export class OrderPaymentService {

  baseService = inject(MasterService);
   url = `${environment.apiUrl}OrderPayment`;
    private orderPrintEvent = new BehaviorSubject<number>(0);
    orderPaymentData$: Observable<number> = this.orderPrintEvent.asObservable();
    private orderPaymentDataEvent = new BehaviorSubject<OrderPayment>(new OrderPayment());
    orderPayment$: Observable<OrderPayment> = this.orderPaymentDataEvent.asObservable();
   constructor() { }

   triggerOrderPrint(id: number): void {
    this.orderPrintEvent.next(id);
  }
  triggerOrderPaymentData(data: OrderPayment): void {
    this.orderPaymentDataEvent.next(data);
  }
   post(obj: OrderPayment): Observable<any>{
     return this.baseService.post<any>(this.url, obj);
   }
 
  //  loadAll():Observable<Product[]>{
  //    return this.baseService.get<Product[]>(this.url);
  //  }
 
 
   
}
