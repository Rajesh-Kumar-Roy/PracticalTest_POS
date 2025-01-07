import { PaymentMethodStatus, PaymentStatus } from "./paymentStatus.model";


export class OrderPayment {
    id: number;
    totalAmount: number;
    paymentMethodStatus: PaymentMethodStatus;
    paymentDate: string;
    bankName: string | null;
    takenAmount: number | null;
    returnAmount: number | null;
    paidAmount: number | null;
    dueAmount: number | null;
    paymentStatus: PaymentStatus;
    orderId: number;
    constructor(){
        this.id = 0;
        this.totalAmount = 0;
        this.paymentMethodStatus = PaymentMethodStatus.Cash;
        this.paymentDate = '';
        this.bankName = null;
        this.takenAmount = null;
        this.returnAmount = null;
        this.paidAmount = null;
        this.dueAmount = null; 
        this.paymentStatus = PaymentStatus.Due;
        this.orderId = 0;
    }
}