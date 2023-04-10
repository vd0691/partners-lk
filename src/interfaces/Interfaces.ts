export interface Product {
    id: string,
    name: string,
    description: string,
    vendorCode: string,
    descriptionHtml: string,
    groupId: string,
    level: number,
    countryOfOrigin: string,
    isOutOfStock: boolean,
    discount: number,
    salePriceBeforeDiscount: number,
    retailPriceBeforeDiscount: number,
    salePrice: number,
    retailPrice: number,
    isNovelty: boolean
}

export interface ProductCategories {
    id: string,
    name: string,
    groupId: string,
    level: number
}

export interface CartProduct {
    id: string
    vendorCode: number
    name: string,
    retailPriceBeforeDiscount: number,
    retailPrice: number,
    discount: number
    amount: number,
    total?: number
}

export interface User {
    username: string,
    token: string
}

export interface Contractor {
    id: string,
    name: string,
    description: string,
    inn: string,
    kpp: string,
    legalAddress: string,
    actualAddress: string
}

export interface Partner {
    id?: string,
    name?: string,
    discount?: number,
    account?: string
}