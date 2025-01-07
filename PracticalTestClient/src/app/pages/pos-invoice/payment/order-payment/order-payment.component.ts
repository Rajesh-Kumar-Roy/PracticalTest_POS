import { CommonModule } from '@angular/common';
import { ApplicationRef, Component, createComponent, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { PosService } from '../../../../core/services/pos.service';
import { Subscription } from 'rxjs';
import { Order } from '../../../../shared/models/order.model';
import { OrderPaymentService } from '../../../../core/services/order-payment.service';
import { OrderPayment } from '../../../../shared/models/order.payment.model';
import { PaymentMethodStatus, PaymentStatus } from '../../../../shared/models/paymentStatus.model';
import { ToastrService } from 'ngx-toastr';
import { OrderDetailsPrintComponent } from "../order-details-print/order-details-print.component";

@Component({
  selector: 'app-order-payment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order-payment.component.html',
  styleUrl: './order-payment.component.css'
})
export class OrderPaymentComponent {
  totalAmount: number = 0.0;
  subtotal: number = 0.0;
  vat: number = 60.0;
  discount: number = 0.0;
  adjustment: number = 0.0;
  inputAmount: number = 0.0;
  taken: number = 0.0;
  returnAmount: number = 0.0;
  paid: number = 0.0;
  due: number = 0.0;
  status: string = 'Pending';
  paymentMethod: PaymentMethodStatus = PaymentMethodStatus.Cash;
  bankName='';
  order: Order = new Order();
  PaymentMethodStatus = PaymentMethodStatus;
  isCalculate: boolean = false;
 

  private subscription: Subscription;
  @Output() closeButtonEvent: EventEmitter<any> = new EventEmitter<any>();
  constructor(private _posService: PosService, private injector: Injector,private _orderPaymentService: OrderPaymentService,private applicationRef: ApplicationRef, private _toastr: ToastrService) {
    this.subscription = this._submitSubscription();
  }

  selectPaymentMethod(method: PaymentMethodStatus) {
    this.paymentMethod = method;
  }

  onEnter() {
    this.isCalculate = true;
    this.taken = this.inputAmount;
    this.paid = this.taken;
    this.returnAmount = this.taken > this.order.total ? this.taken - this.order.total : 0;
    this.due = (this.order.total - this.taken) > 0 ? (this.order.total - this.taken) : 0;
    this.status = this.due === 0 ? PaymentStatus[PaymentStatus.Paid] : PaymentStatus[PaymentStatus.Due];
  }
  private _submitSubscription(){
    // Subscribe to the submit event
    return this._posService.paymentForm$.subscribe((id: number) => {
     if(id){
        this.getOrderById(id);
     }
    });
  }
  getOrderById(id: number) {
    this._posService.getOrderWithItemById(id).subscribe((res) => {
      this.order = res;
      console.log(res);
    });
  }
  onSave() {
      if(this.isCalculate){
        this.isCalculate = false;

    let orderPayment = new OrderPayment();
    orderPayment.id = 0;
    orderPayment.orderId = this.order.id;
    orderPayment.totalAmount = this.order.total;
    orderPayment.bankName = this.bankName;
    orderPayment.paymentMethodStatus = this.paymentMethod;
    orderPayment.paymentDate = new Date().toISOString();
    orderPayment.takenAmount = this.taken;
    orderPayment.returnAmount = this.returnAmount;
    orderPayment.paidAmount = this.paid;
    orderPayment.dueAmount = this.due;
    orderPayment.paymentStatus = this.status === PaymentStatus[PaymentStatus.Paid] ? PaymentStatus.Paid : PaymentStatus.Due;

      this._orderPaymentService.post(orderPayment).subscribe((res) => {
        this._toastr.success('Payment Successful');
        if(this.order.id > 0){
          this._orderPaymentService.triggerOrderPrint(this.order.id);
          this._orderPaymentService.triggerOrderPaymentData(orderPayment);
          this.closeButtonEvent.emit();
          this.reset();
          setTimeout(() => {
            this.printPopup(OrderDetailsPrintComponent);
          }, 1000);
        }
       
      });
    }else{
      this._toastr.error('Please enter for calculation.');
    }
    
   
  }
  reset(){
    this.totalAmount = 0.0;
    this.subtotal = 0.0;
    this.vat = 60.0;
    this.discount = 0.0;
    this.adjustment = 0.0;
    this.inputAmount = 0.0;
    this.taken = 0.0;
    this.returnAmount = 0.0;
    this.paid = 0.0;
    this.due = 0.0;
    this.status = 'Pending';
  }
  onReceipt() {
    if( this.isCalculate){
      this.isCalculate = false;
    
    let orderPayment = new OrderPayment();
    orderPayment.id = 0;
    orderPayment.orderId = this.order.id;
    orderPayment.totalAmount = this.order.total;
    orderPayment.bankName = this.bankName;
    orderPayment.paymentMethodStatus = this.paymentMethod;
    orderPayment.paymentDate = new Date().toISOString();
    orderPayment.takenAmount = this.taken;
    orderPayment.returnAmount = this.returnAmount;
    orderPayment.paidAmount = this.paid;
    orderPayment.dueAmount = this.due;
    orderPayment.paymentStatus = this.status === PaymentStatus[PaymentStatus.Paid] ? PaymentStatus.Paid : PaymentStatus.Due;

    this._orderPaymentService.triggerOrderPrint(this.order.id);
    this._orderPaymentService.triggerOrderPaymentData(orderPayment);
    setTimeout(() => {
      this.printPopup(OrderDetailsPrintComponent);
    }, 1000);
  }else{
    this._toastr.error('Please enter for calculation.');
  }
  }

  printPopup(componentClass: any) {
    // pop up dimensions
    const width = 500;
    const height = 800;
    // Calculate the position to center the window on the screen
    const screenLeft = window.screenLeft || window.screenX;
    const screenTop = window.screenTop || window.screenY;
    const screenWidth = window.innerWidth || document.documentElement.clientWidth || screen.width;
    const screenHeight = window.innerHeight || document.documentElement.clientHeight || screen.height;

    const left = (screenWidth / 2) - (width / 2) + screenLeft;
    const top = (screenHeight / 2) - (height / 2) + screenTop;

    const printWindow = window.open('', '_blank',
      `width=${width},height=${height},top=${top},left=${left}`);

    if (printWindow) {
      const html = `
      <html>
        <head>
          <title>Invoice</title>
          <style>
            @media print {
              .print-btn {
                display: none;
              }
            }
            body { padding: 20px; }
            h2 { font-size: 16px; text-align: center; }
            table { width: 100%; border-collapse: collapse; }
            td, th { padding: 4px; border-top: 1px dashed black; text-align: left;}
            .text-right { text-align: right; }
            .text-left { text-align: left; }

            /* Center align everything except the table */
            .content-center {
              text-align: center;
            }
            .invoice-table {
              width: 100%;
              text-align: left; /* Keep table content left-aligned */
            }
            .print-btn { margin-bottom: 20px; text-align: center; }
          </style>
        </head>
        <body>
            <div id="print-container"></div>
        </body>
      </html>`;

      printWindow.document.write(html);
      printWindow.document.close();

      // Create component using the modern approach
      const componentRef = createComponent(componentClass, {
        environmentInjector: this.applicationRef.injector,
        elementInjector: this.injector
      });

      // Manually trigger change detection
      this.applicationRef.attachView(componentRef.hostView);

      // Get the native element and append it to the print window
      const componentElement = (componentRef.hostView as any).rootNodes[0];
      printWindow.document.getElementById('print-container')?.appendChild(componentElement);

      // Set up cleanup using beforeunload
      const cleanup = () => {
        componentRef.destroy();
        this.applicationRef.detachView(componentRef.hostView);
        printWindow.removeEventListener('beforeunload', cleanup);
      };

      printWindow.addEventListener('beforeunload', cleanup);

      // Optional: Add a MutationObserver to detect when the window is closed
      const observer = new MutationObserver(() => {
        if (printWindow.closed) {
          cleanup();
          observer.disconnect();
        }
      });

      observer.observe(printWindow.document.body, {
        childList: true,
        subtree: true
      });

      return {
        printWindow,
        cleanup: () => {
          cleanup();
          observer.disconnect();
        }
      };
    }
    return null;
  }

  onClose() {
    this.closeButtonEvent.emit();
  }
}
