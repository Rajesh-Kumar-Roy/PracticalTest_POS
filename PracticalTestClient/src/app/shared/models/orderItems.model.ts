export class OrderItem {
    id: number;
    productId: number;
    productName: string;
    price: number;
    quantity: number;
    orderId: number;
    constructor(){
        this.id = 0;
        this.productId =0;
        this.productName ='';
        this.price = 0;
        this.quantity = 0;
        this.orderId = 0;
    }
}