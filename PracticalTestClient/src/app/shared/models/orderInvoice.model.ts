import { OrderItem } from "./orderItems.model";

export class OrderInvoiceDto {
    id: number;
    vatAmount: number;
    discountAmount: number | null;
    adjustmentAmount: number | null;
    subTotal: number;
    total: number;
    orderDate: string;
    customerName: string;
    orderItems: OrderItem[];

    constructor() {
        this.id = 0;
        this.vatAmount = 0;
        this.discountAmount = 0;
        this.adjustmentAmount = 0;
        this.subTotal = 0;
        this.total = 0;
        this.orderDate = new Date().toISOString();
        this.customerName = '';
        this.orderItems = [];
    }
}