export interface Product{
    idFirebase?: string,
    name?: string,
    image?:string,
    description?: string,
    price?: number,
    categoryId?: string,
    quantity?: number,
    total?: number,
    orderId?: string,
    status?:boolean
}