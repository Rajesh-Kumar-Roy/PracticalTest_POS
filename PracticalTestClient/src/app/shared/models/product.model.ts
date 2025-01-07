

  export interface Product {
    id: number;
    name: string;
    price: number;
    barNo: string;
    genericName: string;
    description: string;
    pictureUrl: string;
    productTypeId: number;
    productBrandId: number;
    isAvailable: boolean;
}

export interface ProductBrand {
    id: number;
    name: string;
}
export interface ProductType {
    id: number;
    name: string;
}
