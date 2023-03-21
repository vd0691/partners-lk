export interface Product {
    id: string
    vendorCode: number
    name: string,
    countryOfOrigin: string,
    isNovelty: boolean,
    retailPriceBeforeDiscount: number,
    retailPrice: number,
    discount: number 
}