import { OrderItem } from "./orderItems.model";
import { OrderStatus } from "./orderStatus.model";


export class Order{
    id: number;
    vatAmount: number;
    discountAmount: number;
    adjustmentAmount: number;
    subTotal: number;
    total: number;
    status: OrderStatus;
    customerId: number;
    orderItems: OrderItem[];
    constructor(){
        this.id = 0;
        this.vatAmount = 0;
        this.discountAmount = 0;
        this.adjustmentAmount = 0;
        this.subTotal = 0;
        this.total = 0;
        this.status = OrderStatus.Pending;
        this.customerId = 0;
        this.orderItems = []
    }
}