import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PosService } from '../../../../core/services/pos.service';
import { OrderInvoiceDto } from '../../../../shared/models/orderInvoice.model';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { OrderPaymentService } from '../../../../core/services/order-payment.service';
import { OrderPayment } from '../../../../shared/models/order.payment.model';
import { PaymentMethodStatus, PaymentStatus } from '../../../../shared/models/paymentStatus.model';

@Component({
  selector: 'app-order-details-print',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-details-print.component.html',
  styleUrl: './order-details-print.component.css'
})
export class OrderDetailsPrintComponent {
  orderInVoice!: OrderInvoiceDto;
  orderPayment: OrderPayment = new OrderPayment();
  PaymentStatus = PaymentStatus;
  PaymentMethodStatus = PaymentMethodStatus;
 private subscription: Subscription;
 private orderPaymentSubscription: Subscription;

  constructor(
    private _posService: PosService, private _orderPaymentService: OrderPaymentService) {
      this.subscription = this._submitSubscription();
      this.orderPaymentSubscription = this._orderPaymentSubscription();

  }
  
  private _submitSubscription(){
    // Subscribe to the submit event
    return this._orderPaymentService.orderPaymentData$.subscribe((id: number) => {
     if(id){
      this._posService.getOrderInvoiceDataByOrderId(id).subscribe(data => {
        this.orderInVoice = data;
      });
     }
    });
  }

  private _orderPaymentSubscription(){
    // Subscribe to the submit event
    return this._orderPaymentService.orderPayment$.subscribe((data: OrderPayment) => {
     if(data){
      console.log(data);
      this.orderPayment = data;
     }
    });
  }



  ngOnDestroy(): void {

  }
}
