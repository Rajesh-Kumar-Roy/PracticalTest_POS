import { CommonModule } from '@angular/common';
import { Component, createComponent, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { CalculatorModalComponent } from "../../../shared/components/calculator-modal/calculator-modal.component";
import { OrderPaymentComponent } from "../payment/order-payment/order-payment.component";
import { ModalComponent } from "../../../shared/components/modal/modal.component";

@Component({
  selector: 'app-pos-footer',
  standalone: true,
  imports: [CommonModule, CalculatorModalComponent, OrderPaymentComponent, ModalComponent],
  templateUrl: './pos-footer.component.html',
  styleUrl: './pos-footer.component.css'
})
export class PosFooterComponent  implements OnChanges {

  @Output() ButtonEvent: EventEmitter<any> = new EventEmitter<any>(); 
  @Output() DisCountButtonEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() paymentButtonEvent: EventEmitter<any> = new EventEmitter<any>();
  @Input() footerTotalAmount = 0;
  isPaymentModalVisiable = false;

  onResetButtonClick(){
    this.ButtonEvent.emit(true);
  }
  onDisCountButtonClick(){
    this.DisCountButtonEvent.emit(true);
  }
  onPaymentButtonClick(){
    if(this.footerTotalAmount > 0){
      this.isPaymentModalVisiable = true;
      this.paymentButtonEvent.emit(true);
    }
   
  }
  closeModal(){
    this.isPaymentModalVisiable = false;
  }
  ngOnChanges(changes: SimpleChanges): void {
    // if (changes['totalAmount']) {
    //   console.log('totalAmount changed:', changes['totalAmount'].currentValue);
    //   // Perform actions when totalAmount changes
    // }
  }

}
